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
      },
      {
        tableName: "tag_mst",
        timestamps: false,
      }
    );
  
    Tag.createTag = async (tagData) => {
      return Tag.create(tagData);
    };
  
    return Tag;
  };
  
  module.exports = TagModel;
  