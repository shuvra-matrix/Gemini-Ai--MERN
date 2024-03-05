import { getGooleOAuthToken, getGoogleUser } from "../service/auth_service.js";
import { user } from "../model/user.js";

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

      const ip = req.clientIp;

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
      res.redirect("http://localhost:3000");
    })
    .catch((error) => {
      console.log(error);
    });
};
