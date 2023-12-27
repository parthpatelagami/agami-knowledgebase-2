const { DataTypes } = require('sequelize')
const CompanyModel = require('./CompanyModel')
const UserModel = require('./UserModel')

const CategoryModel = (sequelize, Sequelize) => {
    const Category = sequelize.define(
        "category_mst",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            category_name: {
                type: Sequelize.TEXT,
            },
            active: {
                type: Sequelize.ENUM('0', '1'),
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'user_mst',
                  key: 'id',
                },
              },
            created_date: {
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
            },
            modified_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'user_mst',
                  key: 'id',
                },
            },
            modified_date: {
                type: Sequelize.DATE,
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
            tableName: "category_mst",
            timestamps: false,
        }
    )
      Category.belongsTo(CompanyModel(sequelize, Sequelize), {
        foreignKey: 'company_id',
        as: 'companyId',
      });

      Category.belongsTo(UserModel(sequelize, Sequelize), {
        foreignKey: 'created_by',
        as: 'createdBy',
      });
      
      Category.belongsTo(UserModel(sequelize, Sequelize), {
        foreignKey: 'modified_by',
        as: 'modifiedBy',
      });

    Category.createCategory = async (categoryData) => {
        return Category.create(categoryData)
    }

    return Category
}

module.exports = CategoryModel
