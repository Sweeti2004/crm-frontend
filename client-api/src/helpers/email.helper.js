const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'robbie33@ethereal.email',
        pass: 'HNfsjkxrZk8uvgWn8V'
    }
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const emailProcessor = async ({ email, pin, type }) => {
  let info = "";

  switch (type) {
    // case "request-new-password":
    case "request-new-password":
      info = {
        from: '"CMR Company" <leopoldo40@ethereal.email>',
        to: email,
        subject: "Password reset Pin",
        text: "Here is your password rest pin " + pin + " This pin will expires in 1 day",
        html: `<b>Hello </b>
        <p>Here is your pin:</p>
        <b>${pin}</b>
        <p>This pin will expire in 1 day.</p>`,
      };

      await send(info);
      break;

    // case "update-password-success":
    case "update-password-success":
      info = {
        from: '"CMR Company" <leopoldo40@ethereal.email>',
        to: email,
        subject: "Password updated",
        text: "Your new password has been update",
        html: `<b>Hello </b>
        <p>Your new password has been update</p>`,
      };

      await send(info);
      break;

    // case "new-user-confirmation-required":
    //   info = {
    //     from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
    //     to: email, // list of receivers
    //     subject: "Please verify your new user", // Subject line
    //     text:
    //       "Please follow the link to very your account before you can login", // plain text body
    //     html: `<b>Hello </b>
    //     <p>Please follow the link to very your account before you can login</p>
    //     <p>${verificationLink}</P>
    //     `, // html body
    //   };

    //   send(info);
    //   break;

    default:
      break;
  }
};

module.exports = { emailProcessor };
