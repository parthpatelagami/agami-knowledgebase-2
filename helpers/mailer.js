const nodemailer = require("nodemailer");

// Reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "aadil.mangera@agami-tech.com",
    pass: "dcjhudbpbhlygwjd",
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
