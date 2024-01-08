const licenseService = require("../service/LicenseService");

const checkDomainLicense = async (req, res) => {
  return licenseService.checkDomainLicense(req.body, res);
};


module.exports = {
    checkDomainLicense
};