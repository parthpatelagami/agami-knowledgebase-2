const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user_mst",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      password: {
        type: Sequelize.TEXT,
      },
      created_date: {
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      COMPANY_ID: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "user_mst",
      timestamps: false,
    }
  );

  User.createUser = async (userData) => {
    return User.create(userData);
  };

  return User;
};

module.exports = UserModel;
