const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("transporter_username"),
    pass: config.get("transporter_password"),
  },
});
module.exports = transporter;
