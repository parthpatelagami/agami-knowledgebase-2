const dotenv = require("dotenv");
const Sequelize = require("sequelize");

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

const dbconfig = {};
dbconfig.Sequelize = Sequelize;
dbconfig.sequelize = sequelize;

module.exports = dbconfig;
