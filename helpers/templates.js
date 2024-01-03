exports.templates = {
  admin: {
    name: "admin",
    email: "admin@admin.com",
  },
  confirmEmails: {
    from: "no-reply@test-app.com",
    subject: "OTP Generated",
    message: " is your OTP, and is valid for 10 minutes.",
  },
  resetPassword: {
    from: "no-reply@test-app.com",
    subject: "Reset Password",
    message:
      " is your security code which can be used to change your password. It is valid for 15 minutes.",
  },
};
