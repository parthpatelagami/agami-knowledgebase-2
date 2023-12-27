const CompanyModel = require('./CompanyModel')

const TagModel = (sequelize, Sequelize) => {
    const Tag = sequelize.define(
      "tag_mst",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        tag_name: {
          type: Sequelize.TEXT,
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
        tableName: "tag_mst",
        timestamps: false,
      }
    );

    Tag.belongsTo(CompanyModel(sequelize, Sequelize), {
      foreignKey: 'company_id',
      as: 'companyId',
    });
  
    Tag.createTag = async (tagData) => {
      return Tag.create(tagData);
    };
  
    return Tag;
  };
  
  module.exports = TagModel;
  