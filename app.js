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
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const logger = require("./config/logger/logger.config.js");
const path = require("path");
const upload = require("./middlewares/FileUploads.js");
const agmFilter = require("./middlewares/agmFIlter.js");
const redisClientConfig = require("./config/dbconfig/cachedbconfig/redisconfig.js");
const {
  checkElasticSearchClusterHealth,
} = require("./service/elsearch/elSearchUtility.js");
const dbconfig = require("./config/dbconfig/dbconfigmain.js");
const questionReplesRoutes = require("./routes/questionReplyRoutes.js");
require("./cron/calculatePopularQuestion");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger/swagger_options.json");
const openAPIRoutes = require("./routes/openApiRoutes.js");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Sync Sequelize with the database
dbconfig.sequelize.sync({ alter: true });

// Redis Connection
redisClientConfig();

// Elasticsearch Health Check
checkElasticSearchClusterHealth();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Implement the configuration
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes to access the api to send email template
app.use('/swagger/api', openAPIRoutes);
app.use("/api", openAPIRoutes);

// Middleware for Company License
app.use(agmFilter);
// Routes for authentication
app.use("/knowledgebase", authRoutes);

// Unauthenticated Routes
app.use("/knowledgebase", upload.single("files[0]"), uploadRoutes);

// Middleware for JWT authentication
app.use(jwtAuthentication);

// Authenticated Routes
app.use("/knowledgebase", userRoutes);
app.use("/knowledgebase", articleRoutes);
app.use("/knowledgebase", productRoutes);
app.use("/knowledgebase", questionsRoutes);
app.use("/knowledgebase", questionReplesRoutes);
app.use("/knowledgebase", categoryRoutes);
app.use("/knowledgebase", dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  logger.info("Successful! Server is running on port " + PORT)
);
