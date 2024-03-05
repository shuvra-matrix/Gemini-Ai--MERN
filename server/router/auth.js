import express from "express";

const routes = express.Router();

import { googleOauthHandler } from "../controller/auth.js";

routes.get("/api/auth/google", googleOauthHandler);

export default routes;
