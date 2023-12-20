const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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
app.use(express.json());
app.get("/", (req, res) => {
  res.send(";)");
});
app.listen(PORT, () => console.log("Successfull"));
