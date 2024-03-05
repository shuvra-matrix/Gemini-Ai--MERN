import jwt from "jsonwebtoken";
import { user } from "../model/user.js";

export const tokenVerify = (token) => {
  return new Promise((res, rej) => {
    const secret = process.env.ACCESS_TOKEN_JWT_SECRET;
    let decodeToken;

    try {
      decodeToken = jwt.verify(token, secret);
    } catch (err) {
      err.statusCode = 401;
      err.data = "invalid token";
      throw err;
    }

    const userEmail = decodeToken.email;

    user
      .findOne({ email: userEmail })
      .then((user) => {
        if (!user) {
          const error = new Error("user not found");
          error.statusCode = 403;
          throw error;
        }
        res(user);
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        rej(err);
      });
  });
};
