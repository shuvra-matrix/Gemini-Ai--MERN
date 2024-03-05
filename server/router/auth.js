import express from "express";

const routes = express.Router();

import {
  googleOauthHandler,
  loginValidation,
  logoutHandler,
} from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";

routes.get("/api/auth/google", authMiddleware, googleOauthHandler);

routes.get("/api/auth/login", loginValidation);

routes.get("/api/auth/logout", authMiddleware, logoutHandler);

export default routes;
