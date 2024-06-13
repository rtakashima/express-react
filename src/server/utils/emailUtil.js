module.exports = async (username, address, message) => {
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: process.env.EMAIL_TO, // list of receivers
    subject: process.env.EMAIL_TITLE, // Subject line
    html: `<ul><li>${username}</li><li>${address}</li><li><pre>${message}</pre></li></ul>`,
  });

  console.log("Message sent: %s", info.messageId);
};
