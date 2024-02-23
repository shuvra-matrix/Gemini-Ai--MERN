import express from "express";

const router = express.Router();

import { getGeminiHome, postGemini } from "../controller/public.js";

router.get("/", getGeminiHome);
router.post("/gemini/api", postGemini);

export default router;
