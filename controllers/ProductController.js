const dbconfig = require("../config/dbconfig/dbconfigmain");
const { Product } = dbconfig.models;

exports.getAllProductQuestionsController = async (req, res) => {
  
    try {
        const products = await Product.findAll();
        res.status(200).json({products });
      } catch (error) {
        console.error("Error during get all products:", error);
        res.sendStatus(500);
      }
  };