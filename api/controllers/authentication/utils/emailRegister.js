import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateVerificationToken = (client) => {
  return jwt.sign({ clientId: client._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const sendVerificationEmail = async (client, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_REGISTER,
    port: process.env.PORT_REGISTER,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME_REGISTER,
      pass: process.env.EMAIL_PASSWORD_REGISTER,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME_REGISTER,
    to: client.email,
    subject: "Vérifiez votre adresse e-mail",
    html: `<p>Bonjour ${client.firstName},</p>
           <p>Veuillez cliquer sur le lien suivant pour vérifier votre adresse e-mail :</p>
           <a href="${process.env.BASE_URL_FRONT}/verify-email-register?token=${verificationToken}">Vérifier votre e-mail</a>`,
  };

  await transporter.sendMail(mailOptions);
};

export { generateVerificationToken, sendVerificationEmail };
