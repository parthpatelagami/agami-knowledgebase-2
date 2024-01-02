const express = require("express");
const { getUserById } = require("../controllers/UserController");

//router object
const router = express.Router();

//GET USER BY ID || POST
router.post("/getUserById", getUserById);

module.exports = router;
