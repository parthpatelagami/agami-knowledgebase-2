const express = require("express");
const {
  jwtLoginController,
  registerUserController,
} = require("../controllers/AuthController");

//router object
const router = express.Router();

//LOGIN || POST
router.post("/login", jwtLoginController);

//REGISTER || POST
router.post("/register", registerUserController);

module.exports = router;
