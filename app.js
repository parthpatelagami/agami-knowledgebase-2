const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const jwtAuthentication = require("./middlewares/jwtAuthentication.js");

const dbconfig = require("./config/dbconfig/dbconfigmain.js");

const app = express();

dotenv.config();
dbconfig.sequelize.sync();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoutes);
app.use(jwtAuthentication);

app.listen(PORT, () =>
  console.log("Successfull! Server is running on " + PORT)
);
