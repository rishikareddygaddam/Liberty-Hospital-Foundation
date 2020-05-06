const nodemailer = require("nodemailer");

async function sendMail(body, subject, to, attachments) {
  console.log("In SendMail");
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //ssl
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: body,
    attachments
  };
  try {
    let response = await transporter.sendMail(mailOptions);
    return response;
  } catch (ex) {
    console.log("Error when sending mail error  " + ex.message);
    return {
      error: true
    };
  }
}

exports.sendMail = sendMail;
