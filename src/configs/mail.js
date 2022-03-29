const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "98888a37388577", // generated ethereal user
    pass: "e1add5a394a790", // generated ethereal password
  },
});