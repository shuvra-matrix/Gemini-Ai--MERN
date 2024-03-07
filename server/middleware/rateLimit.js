export const rateLimit = async (req, res, next) => {
  const user = req.user;
  if (req.auth === "auth") {
    user.currentLimit = 0;
    await user.save();
    return next();
  }
  try {
    const maxRateLimit = user.maxRateLimit;
    const currentTime = Date.now();
    const timeDifference = currentTime - user.recentRateLimitTime;
    if (timeDifference > 60 * 60 * 1000) {
      user.currentLimit = 0;
      user.recentRateLimitTime = currentTime;
    } else {
      if (user.currentLimit > maxRateLimit) {
        const error = new Error("Rate limit exceeded");
        error.data =
          "Rate Limit Exceeded. Please wait for one hour before trying again. Thank you for your patience.";
        error.statusCode = 429;
        return next(error);
      }
    }
    await user.save();
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
