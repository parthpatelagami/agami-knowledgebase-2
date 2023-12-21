const express = require("express");
const { jwtLoginController } = require("../controllers/AuthController");

//router object
const router = express.Router();

//LOGIN || POST
router.post("/login", jwtLoginController);

module.exports = router;
