const ForgotPasswordModel = (sequelize, Sequelize) => {
  const ForgotPasswordModel = sequelize.define(
    "forgot_password",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.TEXT,
      },
      expiry_time: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "forgot_password",
      timestamps: false,
    }
  );
  return ForgotPasswordModel;
};

module.exports = ForgotPasswordModel;
