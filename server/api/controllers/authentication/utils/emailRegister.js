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
    secure: process.env.PORT_REGISTER,
    auth: {
      user: process.env.EMAIL_USERNAME_REGISTER,
      pass: process.env.EMAIL_PASSWORD_REGISTER,
    },
    connectionTimeout: 10000,
    socketTimeout: 15000,
    pool: true,
    debug: true, 
    logger: true  
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME_REGISTER,
    to: client.email,
    subject: "Vérifiez votre adresse e-mail",
    html: ` <div style="text-align: center;">
    <p style="font-size: 18px;">Bonjour ${client.firstName},</p>
    <p style="font-size: 16px;">Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail :</p>
    <p style="margin-top: 20px;">
      <a href="${process.env.BASE_URL_FRONT}/account/verify-email-register/${verificationToken}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Vérifier votre e-mail</a>
    </p>
    <p style="font-size: 14px;>Ce lient est valable 24 heures</p>
     <p style="font-size: 14px; margin-top: 20px;">Si le bouton ne fonctionne pas, veuillez copier et coller le lien suivant dans votre navigateur :</p>
     <p style="font-size: 14px;">${process.env.BASE_URL_FRONT}/account/verify-email-register/${verificationToken}</p>
    </div>`,
  };

  await transporter.sendMail(mailOptions);
};

export { generateVerificationToken, sendVerificationEmail };
