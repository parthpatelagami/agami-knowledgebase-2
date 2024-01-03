const express = require("express");
const {
  loginUser,
  registerUser,
  generateOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");

//router object
const router = express.Router();

//LOGIN || POST
router.post("/login", loginUser);

//REGISTER || POST
router.post("/register", registerUser);

//GENERATE OTP || POST
router.post("/generateotp", generateOTP);

//FORGOT PASSWORD || POST
router.post("/forgotpassword", forgotPassword);

// RESET PPASSWORD || POST
router.post("/resetpassword", resetPassword);

module.exports = router;
