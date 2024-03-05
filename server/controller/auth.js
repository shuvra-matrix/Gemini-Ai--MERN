import { getGooleOAuthToken, getGoogleUser } from "../service/auth_service.js";
import { user } from "../model/user.js";
import "dotenv/config";
import { jwtSignIn } from "../service/auth_service.js";

export const googleOauthHandler = (req, res, next) => {
  const code = req.query.code;

  let newUserData;

  getGooleOAuthToken(code)
    .then((tokenData) => {
      const { access_token, id_token } = tokenData;

      console.log(tokenData);

      return getGoogleUser(id_token, access_token);
    })
    .then((userData) => {
      if (!userData.email_verified) {
        const error = new Error("Email address is not varified");
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

      const accessTokenSecret = process.env.ACCESS_TOKEN_JWT_SECRET;
      const refreshTokenSecret = process.env.REFRESH_TOKEN_JWT_SECRET;
      const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRETIME;
      const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRETIME;

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

      const applicationType = process.env.APPLICATION_TYPE;
      const cookieDomain = process.env.COOKIE_DOMAIN;

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
        accessCookieOption.sameSite = "Lex";
        refreshCookieOption.secure = true;
        refreshCookieOption.sameSite = "Lex";
      }

      res.cookie("access_token", accessToken, accessCookieOption);
      res.cookie("refresh_token", refreshToken, refreshCookieOption);
      res.cookie("isLogin", "yes", accessCookieOption);

      const clientRedirectUrl = process.env.CLIENT_REDIRECT_URL;
      res.redirect(clientRedirectUrl);
    })
    .catch((error) => {
      console.log(error);
    });
};
