const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: config.get("transporter_username"),
    pass: config.get("transporter_password"),
  },
  tls: {
    rejectUnAuthorized: true,
  },
});
module.exports = transporter;
