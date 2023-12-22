const express = require("express");
const {
  jwtLoginController,
  registerUserController,
  generateOTP,
} = require("../controllers/AuthController");

//router object
const router = express.Router();

//LOGIN || POST
router.post("/login", jwtLoginController);

//REGISTER || POST
router.post("/register", registerUserController);

//GENERATE OTP || POST
router.post("/generateotp", generateOTP);

module.exports = router;
