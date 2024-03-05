export const getCookieValue = (cookieString, cookieName) => {
  try {
    const cookies = cookieString.split(";").map((cookie) => cookie.trim());

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }

    return null;
  } catch (err) {
    return null;
  }
};
