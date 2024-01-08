const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load your email template
const activationEmailTemplatePath = path.join(__dirname, 'htmlFile', 'activation_link_email_template.html');
const otpEmailTemplatePath = path.join(__dirname, 'htmlFile', 'otp_link_email_template.html');

const activationEmailTemplate = fs.readFileSync(activationEmailTemplatePath, { encoding: 'utf-8' });
const otpEmailTemplate = fs.readFileSync(otpEmailTemplatePath, { encoding: 'utf-8' });

const sendEmail = () => {
    // Create a Nodemailer transporter
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amit.vishwakarma@agami-tech.com',
                pass: 'xxeyeiqhwdhvigld'
            }
        });

        // Email options
        const mailOptions = {
            from: 'amit.vishwakarma@agami-tech.com',
            to: 'vishwaking234@gmail.com',
            subject: 'TEST TEMPLATE',
            text: 'Just testing the email template',
            html: activationEmailTemplate
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return reject({
                    message: "Error Occured"
                })
            } else {
                console.log('Email sent:', info.response);
                resolve({
                    message: "Email Sent Successfully"
                })
            }
        });
    })
}

module.exports = { sendEmail }