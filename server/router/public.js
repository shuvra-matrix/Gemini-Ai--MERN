import express from "express";

const router = express.Router();

import {
  getGeminiHome,
  postGemini,
  getChatHistory,
  postChat,
} from "../controller/public.js";

router.get("/api", getGeminiHome);
router.post("/api/chat", postGemini);
router.get("/api/getchathistory", getChatHistory);
router.post("/api/chatdata", postChat);

export default router;
