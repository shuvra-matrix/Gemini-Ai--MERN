import "dotenv/config";
import jwt from "jsonwebtoken";

export const getGooleOAuthToken = (code) => {
  const url = "https://oauth2.googleapis.com/token";

  const redirect_url = process.env.GOOGLE_OAUTH_REDIRECT_URL;

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: redirect_url,
    grant_type: "authorization_code",
  };

  return new Promise((res, rej) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(values).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Google Oauth Tokens");
        }
        return response.json();
      })
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const getGoogleUser = (id_token, access_token) => {
  return new Promise((res, rej) => {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No User Found");
        }
        return response.json();
      })
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const jwtSignIn = (userData, secret, expireTime) => {
  const token = jwt.sign(userData, secret, { expiresIn: expireTime });

  return token;
};
