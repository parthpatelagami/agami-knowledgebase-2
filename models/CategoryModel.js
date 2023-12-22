const { DataTypes } = require('sequelize')
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
            },
            created_date: {
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
            },
            modified_by: {
                type: Sequelize.INTEGER,
            },
            modified_date: {
                type: Sequelize.DATE,
            },
        },
        {
            tableName: "category_mst",
            timestamps: false,
        }
    )

    Category.createCategory = async (categoryData) => {
        return Category.create(categoryData)
    }

    return Category
}

module.exports = CategoryModel
