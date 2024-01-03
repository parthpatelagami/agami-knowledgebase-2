const jwt = require("jsonwebtoken");
const dbconfig = require("../config/dbconfig/dbconfigmain");
const Token = dbconfig.models.Token;
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

module.exports = authenticateToken = async (req, res, next) => {
  const accessToken = req.headers["x-access-token"];

  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, accessTokenSecretKey, async (err, user) => {
    if (err) {
      // If access token is expired, check for a refresh token
      const refreshToken = req.headers["x-refresh-token"];

      if (!refreshToken) return res.sendStatus(403);

      try {
        // Verify the refresh token
        jwt.verify(refreshToken, refreshTokenSecretKey, async (err) => {
          if (err) {
            return res.sendStatus(403);
          }
        });
        // Check for it in the Database
        const existingToken = await Token.findOne({
          where: { token: refreshToken },
        });
        if (!existingToken) return res.sendStatus(403);

        // Add companyId and userId to the request body
        req.body = {
          ...req.body,
          companyId: existingToken.company_id,
          userId: existingToken.user_id,
        };
        // If the refresh token is valid, generate a new access token
        const newAccessToken = await jwt.sign(
          { companyId: existingToken.company_id, id: existingToken.user_id },
          accessTokenSecretKey,
          { expiresIn: accessTokenExpiration }
        );

        // Send the new access token to the client
        res.setHeader("x-access-token", newAccessToken);

        // Continue to the next middleware
        return next();
      } catch (error) {
        console.error("Error during token verification:", error);
        return res.sendStatus(403);
      }
    }
    // Add companyId and userId to the request body
    req.body = {
      ...req.body,
      companyId: user.companyId,
      userId: user.id,
    };
    req.user = user;
    next();
  });
};
