import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || "default_jwt_refresh_secret",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api/v1/",
  },
};
