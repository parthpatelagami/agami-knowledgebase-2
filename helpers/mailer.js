const nodemailer = require("nodemailer");

// Reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});

exports.send = function (from, to, subject, body) {
  // send mail with defined transport object
  return transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: body,
    //html: html,     // To use html body e.g. '<b>Hello world?</b>'
    //cc: cc
    //attachments: attachments
  });
};

exports.randomNumber = function (length) {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
};
