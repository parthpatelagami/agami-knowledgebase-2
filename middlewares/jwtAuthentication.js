const jwt = require("jsonwebtoken");
const dbconfig = require("../config/dbconfig/dbconfigmain");
const Token = dbconfig.models.Token;
const secretKey = process.env.SECRET_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

module.exports = authenticateToken = async (req, res, next) => {
  const accessToken = req.headers["x-access-token"];

  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, secretKey, async (err, user) => {
    if (err) {
      // If access token is expired, check for a refresh token
      const refreshToken = req.headers["x-refresh-token"];

      if (!refreshToken) return res.sendStatus(403);

      try {
        // Verify the refresh token
        const existingToken = await Token.findOne({
          where: { token: refreshToken },
        });
        if (!existingToken) return res.sendStatus(403);

        // If the refresh token is valid, generate a new access token
        const newAccessToken = jwt.sign(
          { companyId: existingToken.company_id, id: existingToken.userId },
          secretKey,
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
    req.user = user;
    next();
  });
};
