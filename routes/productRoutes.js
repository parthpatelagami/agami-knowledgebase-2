const express = require("express");
const {
    getAllProductQuestionsController
} = require("../controllers/ProductController");

//router object
const router = express.Router();

router.get("/products", getAllProductQuestionsController);

module.exports = router;
