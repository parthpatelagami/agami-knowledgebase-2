const dbconfig = require("../config/dbconfig/dbconfigmain");
const { User } = dbconfig.models;

const getUserById = async (req, res) => {
  const { id } = req;
  try {
    const user = await User.findOne({ where: { id: id } });
    res.json(user);
  } catch (error) {
    console.error("Error getting User:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  getUserById,
};
