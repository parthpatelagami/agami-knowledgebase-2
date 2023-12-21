const TokenModel = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "user_token",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      created_date: {
        type: Sequelize.DATE,
      },
      expiry_date: {
        type: Sequelize.DATE,
      },
      COMPANY_ID: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "user_token",
      timestamps: false,
    }
  );
  return Token;
};

module.exports = TokenModel;
