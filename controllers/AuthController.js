const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const dbconfig = require("../config/dbconfig/dbconfigmain");
const mailer = require("../helpers/mailer");
const { Token, User, OTP } = dbconfig.models;
const { templates } = require("../helpers/templates");
const Sequelize = require("sequelize");

const secretKey = process.env.SECRET_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

const jwtLoginController = async (req, res) => {
  const { email, password, companyId } = req.body;

  try {
    // Find the user by email
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
        expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days.
        company_id: companyId,
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

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
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

const registerUserController = async (req, res) => {
  const { name, email, password, companyId, otp } = req.body;

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

const generateOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
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
          where: { email: email },
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
        otp + templates.confirmEmails.subject
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
module.exports = {
  jwtLoginController,
  verifyOTP,
  registerUserController,
  generateOTP,
};
