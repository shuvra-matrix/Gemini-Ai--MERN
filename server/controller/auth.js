import { getGooleOAuthToken, getGoogleUser } from "../service/auth_service.js";
import { user } from "../model/user.js";
import "dotenv/config";
import { jwtSignIn } from "../service/auth_service.js";
import { tokenVerify } from "../helper/tokenVerify.js";
import { getCookieValue } from "../helper/cookieHandler.js";
import jwt from "jsonwebtoken";

const clientRedirectUrl = process.env.CLIENT_REDIRECT_URL;
const accessTokenSecret = process.env.ACCESS_TOKEN_JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_JWT_SECRET;
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRETIME;
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRETIME;
const applicationType = process.env.APPLICATION_TYPE;
const cookieDomain = process.env.COOKIE_DOMAIN || "localhost";

export const googleOauthHandler = (req, res, next) => {
  const code = req.query.code;

  let newUserData;

  getGooleOAuthToken(code)
    .then((tokenData) => {
      const { access_token, id_token } = tokenData;

      return getGoogleUser(id_token, access_token);
    })
    .then((userData) => {
      if (!userData.email_verified) {
        const error = new Error("Email address is not verified");
        error.statusCode = 403;
        throw error;
      }
      newUserData = userData;

      return user.findOne({ email: newUserData.email });
    })
    .then((dbUser) => {
      if (!dbUser) {
        req.user.name = newUserData.name;
        req.user.email = newUserData.email;
        req.user.profileImg = newUserData.picture;
        return req.user.save();
      }

      dbUser.name = newUserData.name;
      dbUser.email = newUserData.email;
      dbUser.profileImg = newUserData.picture;

      return dbUser.save();
    })
    .then((result) => {
      if (!result) {
        const error = new Error("user data update failed");
        error.statusCode = 500;
        throw error;
      }

      const clientUserAgent = req.headers["user-agent"];
      const tokenUserData = {
        email: newUserData.email,
        name: newUserData.name,
        userAgent: clientUserAgent,
      };

      const accessToken = jwtSignIn(
        tokenUserData,
        accessTokenSecret,
        accessTokenExpire
      );

      const refreshToken = jwtSignIn(
        tokenUserData,
        refreshTokenSecret,
        refreshTokenExpire
      );

      const accessCookieOption = {
        maxAge: 900000,
        httpOnly: true,
        domain: cookieDomain,
      };

      const refreshCookieOption = {
        maxAge: 604800000,
        httpOnly: true,
        domain: cookieDomain,
      };

      if (applicationType === "production") {
        accessCookieOption.secure = true;
        accessCookieOption.sameSite = "None";
        refreshCookieOption.secure = true;
        refreshCookieOption.sameSite = "None";
      }

      res.cookie("access_token", accessToken, accessCookieOption);
      res.cookie("refresh_token", refreshToken, refreshCookieOption);
      res.cookie("isLogin", "yes", accessCookieOption);
      res.redirect(clientRedirectUrl);
    })
    .catch((error) => {
      console.log(error);
    });
};

let a = 0;

export const loginValidation = (req, res, next) => {
  const cookieSting = req.headers.cookie;
  const cookieName = "access_token";
  const token = getCookieValue(cookieSting, cookieName);

  if (!token) {
    const err = new Error("Invalid Token");
    err.statusCode = 401;
    throw err;
  }

  a += 1;

  console.log("Login Validation ", a);

  tokenVerify(token)
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 403;
        throw error;
      }
      res.status(200).json({
        message: "Login Success",
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const logoutHandler = (req, res, next) => {
  const cookieSting = req.headers.cookie;
  const acessToken = getCookieValue(cookieSting, "access_token");
  const refresh_token = getCookieValue(cookieSting, "refresh_token");

  req.user.expireAccessToken.push(acessToken);
  req.user.expireRefreshToken.push(refresh_token);
  req.user
    .save()
    .then((result) => {
      if (!result) {
        const error = new Error("Token Expire Add Failed");
        error.statusCode = 403;
        throw error;
      }

      const accessCookieOption = {
        maxAge: 900000,
        httpOnly: true,
        domain: cookieDomain,
      };

      const refreshCookieOption = {
        maxAge: 604800000,
        httpOnly: true,
        domain: cookieDomain,
      };

      if (applicationType === "production") {
        accessCookieOption.secure = true;
        accessCookieOption.sameSite = "None";
        refreshCookieOption.secure = true;
        refreshCookieOption.sameSite = "None";
      }

      res.clearCookie("access_token", accessCookieOption);
      res.clearCookie("refresh_token", refreshCookieOption);
      res.clearCookie("isLogin", accessCookieOption);

      res.status(200).json({ message: "Logout" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const refreshToken = (req, res, next) => {
  const cookieSting = req.headers.cookie;
  const refreshToken = getCookieValue(cookieSting, "refresh_token");
  const accessToken = getCookieValue(cookieSting, "access_token");

  if (!accessToken) {
    const error = new Error("access token not found");
    error.statusCode = 401;
    return next(error);
  }

  if (!refreshToken) {
    const error = new Error("Refresh token not found");
    error.statusCode = 401;
    return next(error);
  }

  const decodeToken = jwt.verify(refreshToken, refreshTokenSecret);

  if (!decodeToken) {
    const err = new Error("Token Invalid");
    err.statusCode = 401;
    err.data = "invalid token";
    return next(err);
  }

  user
    .findOne({ email: decodeToken.email })
    .then((userData) => {
      if (!userData) {
        const error = new Error("user not found");
        error.statusCode = 403;
        throw error;
      }

      const isAccessTokenPresent = userData.expireAccessToken.some(
        (blockedToken) => blockedToken === accessToken
      );

      if (isAccessTokenPresent) {
        const error = new Error("invalid access token");
        throw error;
      }

      const isRefreshTokenPresent = userData.expireRefreshToken.some(
        (blockedToken) => blockedToken === refreshToken
      );

      if (isRefreshTokenPresent) {
        const error = new Error("invalid refresh token");
        throw error;
      }

      const clientUserAgent = req.headers["user-agent"];
      const tokenUserData = {
        email: decodeToken.email,
        name: decodeToken.name,
        userAgent: clientUserAgent,
      };

      const newAccessToken = jwtSignIn(
        tokenUserData,
        accessTokenSecret,
        accessTokenExpire
      );

      const accessCookieOption = {
        maxAge: 900000,
        httpOnly: true,
        domain: cookieDomain,
      };
      if (applicationType === "production") {
        accessCookieOption.secure = true;
        accessCookieOption.sameSite = "None";
      }
      res.cookie("access_token", newAccessToken, accessCookieOption);
      res.cookie("isLogin", "yes", accessCookieOption);

      res.status(200).json({ message: "Token Reset Successful" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
