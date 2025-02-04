import { Request, Response } from "express";
import {
  deleteRefreshToken,
  saveTokens,
  validateRefreshToken,
} from "../../utils/tokenStore";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
var ShoutoutClient = require("shoutout-sdk");
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RefreshToken from "../../models/refreshToken";
import OTP from "../../models/otp";
import hashedMobileNumber from "../../utils/hash";

var apiKey = process.env.SHOUTOUT_API_KEY;
var debug = true,
  verifySSL = false;
var client = new ShoutoutClient(apiKey, debug, verifySSL);

// Load .env variables
dotenv.config();
declare module "express-session" {
  interface SessionData {
    views: number;
    pii: object;
  }
}

export const healthCheck = async (req: Request, res: Response) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You have visited this page ${req.session.views} times.`);
  } else {
    req.session.views = 1;
    res.send("Welcome! This is your first visit.");
  }
};

export const getSessionData = async (req: Request, res: Response) => {
  res.send(req.session);
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Validate the refresh token
    const storedToken = await validateRefreshToken(refreshToken);
    if (!storedToken) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Check if the refresh token exists in the database
    const tokenRecord = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenRecord) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Delete the refresh token from MongoDB
    await deleteRefreshToken(refreshToken);
    await RefreshToken.deleteOne({ token: refreshToken });

    // Generate a new access token
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    );
    const newPayload = { mobile: (payload as jwt.JwtPayload).mobile };
    const newAccessToken = generateAccessToken(newPayload as any);
    const newRefreshToken = generateRefreshToken(newPayload as any);

    await saveTokens(
      (payload as jwt.JwtPayload).mobile,
      newRefreshToken,
      newAccessToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ); // 7 days

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify the token as a refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    );
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Check if the refresh token exists in the database
    const tokenRecord = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenRecord) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Delete the refresh token from MongoDB
    await deleteRefreshToken(refreshToken);
    await RefreshToken.deleteOne({ token: refreshToken });
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.status(200).json({ message: "Logged out successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // Generate OTP
    const otp = Math.floor(10000 + Math.random() * 90000);
    console.log("Generated OTP:", otp);

    const uuid = uuidv4();
    const expiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    // Hash the mobile number
    const hashedMobile = hashedMobileNumber(mobile);

    const saveOTP = new OTP({
      referenceId: uuid,
      mobileNumber: hashedMobile,
      otp: otp,
      expiresAt: expiry,
    });

    await saveOTP.save();

    // Send OTP to the mobile number
    var message = {
      source: "ShoutDEMO",
      destinations: [`${mobile}`],
      content: {
        sms: `Your OTP for TrueLove is ${otp}`,
      },
      transports: ["sms"],
    };

    // TODO: Uncomment the following code to send the OTP
    // client.sendMessage(message, (error: any, result: any) => {
    //     if (error) {
    //         res.status(500).json({ message: 'Failed to send OTP', error });
    //     } else {
    //         res.status(200).json({ message: 'OTP sent successfully', referenceId: uuid });
    //     }
    // });

    res
      .status(200)
      .json({ message: "OTP sent successfully", referenceId: uuid });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { referenceId, mobileNumber, otp } = req.body;
    if (!referenceId || !mobileNumber || !otp) {
      return res
        .status(400)
        .json({ message: "Reference ID, mobile number, and OTP are required" });
    }

    // Hash the mobile number
    const hashedMobile = hashedMobileNumber(mobileNumber);

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      referenceId,
      mobileNumber: hashedMobile,
    });

    // Delete the OTP record
    await OTP.deleteOne({ referenceId, mobileNumber: hashedMobile });

    if (!otpRecord) {
      return res.status(404).json({ message: "OTP record not found" });
    }

    // Check if the OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Check if the OTP is correct
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Generate tokens
    const payload = { mobile: hashedMobile };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save the refresh token in MongoDB
    await saveTokens(
      hashedMobile,
      refreshToken,
      accessToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ); // 7 days

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
