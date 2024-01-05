const express = require("express");
const {
    UploadFileController
} = require("../controllers/UploadController");

//router object
const router = express.Router();

router.post("/upload", UploadFileController);


module.exports = router;
