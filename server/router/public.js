import express from "express";

const router = express.Router();

import {
  getGeminiHome,
  postGemini,
  getChatHistory,
  postChat,
  updateLocation,
} from "../controller/public.js";

router.get("/api", getGeminiHome);
router.post("/api/chat", postGemini);
router.get("/api/getchathistory", getChatHistory);
router.post("/api/chatdata", postChat);
router.put("/api/updatelocation", updateLocation);

export default router;
