const authService = require("../service/AuthService");

const jwtLoginController = async (req, res) => {
  return authService.loginUser(req.body, res);
};

const verifyOTP = async (req, res) => {
  return authService.verifyOTP(req.body, res);
};

const registerUserController = async (req, res) => {
  return authService.registerUser(req.body, res);
};

const generateOTP = async (req, res) => {
  return authService.generateOTP(req.body, res);
};

module.exports = {
  jwtLoginController,
  verifyOTP,
  registerUserController,
  generateOTP,
};
