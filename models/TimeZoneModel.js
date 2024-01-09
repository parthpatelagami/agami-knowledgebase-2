const { DataTypes } = require("sequelize")
const TimeZoneModel = (sequelize, Sequelize) => {
    const TimeZone = sequelize.define(
        "timezone_mst",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            timezon_indentifier: {
                type: Sequelize.TEXT,
            },
            utc_offset: {
                type: Sequelize.TEXT,
            },
        },
        {
            tableName: "timezone_mst",
            timestamps: false,
        }
    )

    TimeZone.createTimeZone = async (timeZoneData) => {
        return TimeZone.create(timeZoneData)
    }

    return TimeZone
}

module.exports = TimeZoneModel
