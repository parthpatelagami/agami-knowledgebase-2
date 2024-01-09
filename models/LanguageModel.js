const { DataTypes } = require("sequelize")
const LanguageModel = (sequelize, Sequelize) => {
    const Language = sequelize.define(
        "language_mst",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            language_name: {
                type: Sequelize.TEXT,
            },
        },
        {
            tableName: "language_mst",
            timestamps: false,
        }
    )

    Language.createLanguage = async (languageData) => {
        return Language.create(languageData)
    }

    return Language
}

module.exports = LanguageModel
