const dbconfig = require("../config/dbconfig/dbconfigmain");
const { User } = dbconfig.models;

const getUserById = async (req, res) => {
  const { userId, companyId } = req;
  try {
    const user = await User.findOne({
      where: { id: userId, company_id: companyId },
    });
    res.json(user);
  } catch (error) {
    console.error("Error getting User:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  getUserById,
};
