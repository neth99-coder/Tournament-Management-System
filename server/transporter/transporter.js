const nodemailer = require('nodemailer');
const transporterConfig = require('../config/transporter.config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: transporterConfig.username,
      pass: transporterConfig.pass
    }
  });
  module.exports = transporter;