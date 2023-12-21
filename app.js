const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const jwtAuthentication = require("./middlewares/jwtAuthentication.js");

const dbconfig = require("./config/dbconfig/dbconfigmain.js");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Sync Sequelize with the database
dbconfig.sequelize.sync();

const PORT = process.env.PORT || 3001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for authentication
app.use("/", authRoutes);

// Middleware for JWT authentication
app.use(jwtAuthentication);

// Start the server
app.listen(PORT, () =>
  console.log("Successful! Server is running on port " + PORT)
);
