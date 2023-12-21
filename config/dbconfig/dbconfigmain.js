const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const UserModel = require("../../models/UserModel");
const TokenModel = require("../../models/TokenModel");

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

// Export Sequelize and the models
const dbconfig = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Token: Token,
  },
};

module.exports = dbconfig;
