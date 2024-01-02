const userService = require("../service/UserService");

const getUserById = async (req, res) => {
  return userService.getUserById(req.body, res);
};

module.exports = {
  getUserById,
};
