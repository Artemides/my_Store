"use strict";
const nodemailer = require("nodemailer");
const {config}=require('./config/config');
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.emailAcc,
        pass: config.emailPass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.emailAcc, // sender address
    to: "145007@unsaac.edu.pe", // list of receivers
    subject: "Hello From Edmpulasky@gmail.com", // Subject line
    text: "Dear edmundo I'm sending you many greetings for using nodemailer", // plain text body
    html: "<b>Welcome to Nodemailer</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);