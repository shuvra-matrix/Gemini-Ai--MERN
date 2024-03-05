import express from "express";
import mongoose from "mongoose";
import requestIp from "request-ip";
import "dotenv/config";
import { user } from "./model/user.js";
import cros from "cors";

const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/gemini?retryWrites=true&w=majority`;
const PORT_NO = 3030;

const app = express();

app.use(express.json());
app.use(requestIp.mw());

const crosOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cros(crosOption));

app.use((req, res, next) => {
  const ip = req.clientIp;

  user
    .findOne({ ip: ip })
    .then((userData) => {
      if (userData) {
        req.user = userData;
        return next();
      }
      const ip = req.clientIp;
      const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}&ip=${ip}&fields=geo`;

      return fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let location;

          if (data.city) {
            location =
              data.city + ", " + data.state_prov + ", " + data.country_name;
          } else {
            location = ip;
          }
          const newUser = new user({
            ip: ip,
            location: location,
          });

          return newUser
            .save()
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
              return next();
            });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

import publicRoutes from "./router/public.js";
import authRoutes from "./router/auth.js";

app.use("/gemini", publicRoutes);
app.use(authRoutes);

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
