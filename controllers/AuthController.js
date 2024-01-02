const authService = require("../service/AuthService");

const loginUser = async (req, res) => {
  return authService.loginUser(req.body, res);
};

const registerUser = async (req, res) => {
  return authService.registerUser(req.body, res);
};

const verifyOTP = async (req, res) => {
  return authService.verifyOTP(req.body, res);
};

const generateOTP = async (req, res) => {
  return authService.generateOTP(req.body, res);
};

module.exports = {
  loginUser,
  registerUser,
  verifyOTP,
  generateOTP,
};
