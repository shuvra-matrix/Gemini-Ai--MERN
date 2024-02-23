import { user } from "../model/user.js";
import { chat } from "../model/chat.js";
import { chatHistory } from "../model/chatHistory.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiHome = (req, res, next) => {
  res.status(200).json({ message: "Welcome to Gemini Ai Api" });
};

export const postGemini = async (req, res, next) => {
  const query = req.body.userInput;
  const previousChat = req.body.previousChat;

  console.log(query);

  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  let message = [
    {
      role: "user",
      parts: "Hello, Who are you?",
    },
    {
      role: "model",
      parts:
        "Great to meet you. I am Gemini. I was developed by Google.I am your personal assistant",
    },
  ];

  if (previousChat.length > 0) {
    message = [...message, ...previousChat];
  }

  console.log(message);

  try {
    const chat = model.startChat({
      history: message,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({ user: query, gemini: text });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
