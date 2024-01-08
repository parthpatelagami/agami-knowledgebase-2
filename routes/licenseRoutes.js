const express = require("express");
const {
    checkDomainLicense
} = require("../controllers/LicenseController");

//router object
const router = express.Router();

//check domain have a license or not
router.post("/checklicense", checkDomainLicense);


module.exports = router;