import { Router } from "express";
import authRouter from "./auth/auth.routes";
import LoggerInstance from "../utils/logger";

const router = Router();

router.get("/", (_req, res) => {
  const serverStartTime =
    process.env.SERVER_START_TIME || new Date().toISOString();
  const currentTime = new Date().toISOString();

  const responsePayload = {
    status: "🟢 healthy",
    message: "✅ Response from Backend NodeTS Server-3",
    serverStartTime,
    currentTime,
    uptime: `${process.uptime()} seconds`,
    version: process.env.VERSION || "1.0.0",
  };

  LoggerInstance.debug("Health check response payload logged", {
    responsePayload,
    requestMeta: {
      headers: _req.headers,
      ip: _req.ip,
      url: _req.originalUrl,
    },
  });

  res.status(200).json(responsePayload);
});

router.use("/auth", authRouter);

export default router;
