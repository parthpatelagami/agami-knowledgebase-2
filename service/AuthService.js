const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const dbconfig = require("../config/dbconfig/dbconfigmain");
const mailer = require("../helpers/mailer");
const { templates } = require("../helpers/templates");
const { Token, User, OTP, ForgotPassword } = dbconfig.models;

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

const loginUser = async (req, res) => {
  const { email, password } = req;

  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate access token
      const accessToken = jwt.sign(
        { companyId: user.company_id, id: user.id },
        accessTokenSecretKey,
        { expiresIn: accessTokenExpiration }
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { companyId: user.company_id, id: user.id },
        refreshTokenSecretKey,
        { expiresIn: refreshTokenExpiration }
      );

      // Save refresh token to the database
      await Token.create({
        token: refreshToken,
        user_id: user.id,
        created_date: new Date(),
        expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days.
        company_id: user.company_id,
      });

      res.json({ api_token: accessToken, refreshToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500);
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, companyId, otp } = req;

  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    // Verify OTP
    const otpVerification = await verifyOTP(req, res);
    // OTP is valid, proceed with registration
    if (otpVerification.status === 200) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        company_id: companyId,
      });

      res.status(201).json({ message: "User registered successfully" });
    } else {
      // OTP is invalid or expired
      res.status(otpVerification.status).json({
        message: otpVerification.message,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.sendStatus(500);
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req;
  try {
    // Find the OTP record in the database
    const otpRecord = await OTP.findOne({
      where: {
        email: email,
        otp: otp,
        expiry_time: { [Sequelize.Op.gte]: new Date() }, // Check if not expired
      },
    });
    if (otpRecord) {
      // OTP is valid
      return { status: 200, message: "OTP Verified Successfully" };
    } else {
      // OTP is invalid or expired
      return { status: 401, message: "Invalid or expired OTP" };
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.sendStatus(500);
  }
};

const generateOTP = async (req, res) => {
  const { email } = req;
  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      console.log("IF HERE");
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    let otp = mailer.randomNumber(6);

    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // Set expiration time (e.g., 10 minutes)

    // Check if an OTP has already been sent
    const existingOTP = await OTP.findOne({
      where: { email: email },
    });
    if (existingOTP) {
      // Delete the Old OTP
      await OTP.destroy({
        where: {
          email: email,
        },
      });
    }
    // Create a new OTP
    await OTP.create({
      email: email,
      otp: otp,
      expiry_time: expirationTime,
    });
    // Send the mail using mailer
    mailer
      .send(
        templates.confirmEmails.from,
        email,
        templates.confirmEmails.subject,
        otp + templates.confirmEmails.message
      )
      .then(() => {
        res.status(201).json({ message: "OTP Sent Successfully" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
      });
  } catch (error) {
    console.error("Error during OTP Generation:", error);
    res.sendStatus(500);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req;

  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      // Generate an otp and save it to the database
      let otp = mailer.randomNumber(6);

      await ForgotPassword.create({
        otp: otp,
        user_id: user.id,
        email: email,
        expiry_time: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
      });

      // Send an email to the user with the OTP
      mailer.send(
        templates.resetPassword.from,
        email,
        templates.resetPassword.subject,
        otp + templates.resetPassword.message
      );

      res
        .status(200)
        .json({ message: "Password reset instructions sent to your email" });
    } else {
      res.status(404).json({ message: "User with this email not found" });
    }
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.sendStatus(500);
  }
};

const resetPassword = async (req, res) => {
  const { otp, password } = req;

  try {
    // Verify the reset token in the database
    const resetOTP = await ForgotPassword.findOne({
      where: { otp: otp, expiry_time: { [Sequelize.Op.gte]: new Date() } },
    });

    if (resetOTP) {
      // Update the user's password
      const user = await User.findByPk(resetOTP.user_id);
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedPassword });

      // Delete the used reset token
      await resetOTP.destroy();

      res.status(200).json({ message: "Password reset successful" });
    } else {
      res.status(401).json({ message: "Invalid or expired reset token" });
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyOTP,
  generateOTP,
  forgotPassword,
  resetPassword,
};
