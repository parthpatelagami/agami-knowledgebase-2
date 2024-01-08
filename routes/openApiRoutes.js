const express = require("express")
const router = express.Router()
const { sendEmail } = require("../templates/emailTemplate")

/**
 * @swagger
 * /api/send-email-template:
 *      get:
 *          summary: Send the email template
 *          tags: [Email Template]
 *          description: This will send the template to the provided mail-id
 *          responses:
 *              200:
 *                  description: Email Template has sent successfully.
 */
router.get("/send-email-template", (req, res) => {
    sendEmail()
        .then((response) => res.json({ message: response.message }))
        .catch((error) => res.status(500).json({ error: error.message }))
}
)

module.exports = router;
