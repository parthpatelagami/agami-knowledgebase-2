const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const questionsRoutes = require("./routes/questionRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const articleRoutes = require("./routes/articleRoutes.js");
const jwtAuthentication = require("./middlewares/jwtAuthentication.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const redisClientConfig = require("./config/dbconfig/cachedbconfig/redisconfig.js");
const {
  checkElasticSearchClusterHealth,
} = require("./service/elsearch/elSearchUtility.js");
const dbconfig = require("./config/dbconfig/dbconfigmain.js");
const questionReplesRoutes = require("./routes/questionReplyRoutes.js");
require("./cron/calculatePopularQuestion")

const app = express();

// Load environment variables from .env file
dotenv.config();

// Sync Sequelize with the database
dbconfig.sequelize.sync();

// Redis Connection
redisClientConfig();

// Elasticsearch Health Check
checkElasticSearchClusterHealth();

const PORT = process.env.PORT || 3001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for authentication
app.use("/knowledgebase", authRoutes);

// Middleware for JWT authentication
app.use(jwtAuthentication);

app.use("/knowledgebase", userRoutes);
app.use("/knowledgebase", articleRoutes);
app.use("/knowledgebase", productRoutes);
app.use("/knowledgebase", questionsRoutes);
app.use("/knowledgebase", questionReplesRoutes);
app.use("/knowledgebase", categoryRoutes);

// Start the server
app.listen(PORT, () =>
  console.log("Successful! Server is running on port " + PORT)
);
