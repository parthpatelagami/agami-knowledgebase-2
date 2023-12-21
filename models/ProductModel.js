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
      },
      {
        tableName: "product_mst",
        timestamps: false,
      }
    );
  
    Product.createProduct = async (productData) => {
      return Product.create(productData);
    };
  
    return Product;
  };
  
  module.exports = ProductModel;
  