import { Router, Request } from "express";
import {
  getSessionData,
  healthCheck,
  logout,
  refreshAccessToken,
  //setSessionData,
} from "./auth.controller";
import { authenticate } from "../../middlewares/auth";

const router = Router();

// @ts-ignore
router.get("/", authenticate, healthCheck);

// @ts-ignore
//router.post("/set", setSessionData);
// @ts-ignore
router.get("/get", authenticate, getSessionData);

// @ts-ignore
router.post("/refresh", refreshAccessToken);

// @ts-ignore
router.post("/logout", logout);

export default router;
