import express from "express";
import mongoose from "mongoose";
import requestIp from "request-ip";
import "dotenv/config";
import { user } from "./model/user.js";

const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/gemini?retryWrites=true&w=majority`;
const PORT_NO = 3030;

const app = express();

app.use(express.json());
app.use(requestIp.mw());
app.use((req, res, next) => {
  const allowedOrigins = process.env.ALLOW_ORIGINES || "http://localhost:3000";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

app.use((req, res, next) => {
  const ip = req.clientIp;

  user
    .findOne({ ip: ip })
    .then((userData) => {
      if (userData) {
        req.user = userData;
        next();
      }

      const newUser = new user({
        ip: ip,
      });

      return newUser.save();
    })
    .then((result) => {
      return user.findOne({ ip: ip });
    })
    .then((userData) => {
      if (!userData) {
        const error = new Error("User not found");
        error.statusCode = 403;
        throw error;
      }
      req.user = userData;
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

import PublicRoutes from "./router/public.js";

app.use(PublicRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data, error: error });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(process.env.PORT || PORT_NO, () => {
      console.log(`Gemini server is running on port ${PORT_NO}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
