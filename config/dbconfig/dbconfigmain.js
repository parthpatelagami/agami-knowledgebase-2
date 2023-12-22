const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const UserModel = require("../../models/UserModel");
const TokenModel = require("../../models/TokenModel");
const TagModel = require("../../models/TagModel");
const ProductModel = require("../../models/ProductModel");
const QuestionModel = require("../../models/QuestionModel");
const ArticleModel = require("../../models/QuestionModel");
const VerifyModel = require("../../models/VerifyModel");

dotenv.config(); // Load environment variables from .env file

// Create a new Sequelize with your MySQL connection details
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_DBPORT,
  dialect: process.env.MYSQL_DIALECT,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Import and include the User model
const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);
const OTP = VerifyModel(sequelize, Sequelize);

// Export Sequelize and the models
const dbconfig = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Token: Token,
    Article: Article,
    OTP: OTP,
  },
};

module.exports = dbconfig;
