import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { validateAccessToken } from "../utils/tokenStore";

interface JwtPayload {
  mobile: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decode the token without verifying
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    // Validate the access token against the database
    const isValid = await validateAccessToken(decoded.mobile, token);
    if (!isValid) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }

    // @ts-ignore
    req.user = { mobile: decoded.mobile };
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
