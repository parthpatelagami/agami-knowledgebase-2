const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { Token, User } = require("../models/UserModel");

const secretKey = process.env.SECRET_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

exports.jwtLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Sequelize to find the user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate access token
      const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        secretKey,
        { expiresIn: accessTokenExpiration }
      );

      // Generate refresh token
      const refreshToken = uuid.v4();

      // Save refresh token to the database
      await Token.create({
        token: refreshToken,
        user_id: user.id,
        created_date: new Date(),
        expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      res.json({ accessToken, refreshToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500);
  }
};
