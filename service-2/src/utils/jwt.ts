import jwt from "jsonwebtoken";
import { config } from "../config";

interface JwtPayload {
  mobile: string;
}

// Generate Access Token
export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// Generate Refresh Token
export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
};
