const express = require("express");
const {
  loginUser,
  registerUser,
  generateOTP,
} = require("../controllers/AuthController");

//router object
const router = express.Router();

//LOGIN || POST
router.post("/login", loginUser);

//REGISTER || POST
router.post("/register", registerUser);

//GENERATE OTP || POST
router.post("/generateotp", generateOTP);

module.exports = router;
