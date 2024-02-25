import express from "express";

const router = express.Router();

import {
  getGeminiHome,
  postGemini,
  getChatHistory,
} from "../controller/public.js";

router.get("/api", getGeminiHome);
router.post("/api/chat", postGemini);
router.get("/api/getchathistory", getChatHistory);

export default router;
