const express = require("express");
const {
  getDashBoardData,
  getPopularQuestions,
  getLatestArticles,
} = require("../controllers/DashboardController");

//router object
const router = express.Router();

router.get("/getDashBoardData", getDashBoardData);
router.post("/getPopularQuestions", getPopularQuestions);
router.post("/getLatestArticles", getLatestArticles);

module.exports = router;
