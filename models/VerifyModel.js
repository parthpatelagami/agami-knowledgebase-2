const VerifyModel = (sequelize, Sequelize) => {
  const VerifyModel = sequelize.define(
    "user_verification",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.TEXT,
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      expiry_time: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "user_verification",
      timestamps: false,
    }
  );
  return VerifyModel;
};

module.exports = VerifyModel;
