import jwt from "jsonwebtoken";
import { user } from "../model/user.js";

export const tokenVerify = (token) => {
  return new Promise((res, rej) => {
    const secret = process.env.ACCESS_TOKEN_JWT_SECRET;
    const decodeToken = jwt.verify(token, secret);

    if (!decodeToken) {
      const err = new Error("Token Invalid");
      err.statusCode = 401;
      err.data = "invalid token";
      return next(err);
    }

    const userEmail = decodeToken.email;

    user
      .findOne({ email: userEmail })
      .then((userData) => {
        if (!userData) {
          const error = new Error("user not found");
          error.statusCode = 403;
          throw error;
        }

        const isTokenPresent = userData.expireAccessToken.some(
          (blockedToken) => blockedToken === token
        );

        if (isTokenPresent) {
          const error = new Error("invalid token");
          throw error;
        }

        res(userData);
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        rej(err);
      });
  });
};
