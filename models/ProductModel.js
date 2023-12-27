const CompanyModel = require('./CompanyModel')

const ProductModel = (sequelize, Sequelize) => {
    const Product = sequelize.define(
      "product_mst",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        product_name: {
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
        tableName: "product_mst",
        timestamps: false,
      }
    );

    Product.belongsTo(CompanyModel(sequelize, Sequelize), {
      foreignKey: 'company_id',
      as: 'companyId',
    });
  
    Product.createProduct = async (productData) => {
      return Product.create(productData);
    };
    
  
    return Product;
  };
  
  module.exports = ProductModel;
  