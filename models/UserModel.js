const CompanyModel = require('./CompanyModel')

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
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'company_mst',
          key: 'id',
        },
      },
    },
    {
      tableName: "user_mst",
      timestamps: false,
    }
  );
  User.belongsTo(CompanyModel(sequelize, Sequelize), {
    foreignKey: 'company_id',
    as: 'companyId',
  });

  return User;
};

module.exports = UserModel;
