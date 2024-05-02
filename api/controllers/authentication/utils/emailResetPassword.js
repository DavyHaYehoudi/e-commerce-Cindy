import nodemailer from "nodemailer";

const sendPasswordResetEmail = async (client, resetToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_RESET_PASSWORD,
    port: process.env.PORT_RESET_PASSWORD,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME_RESET_PASSWORD,
      pass: process.env.EMAIL_PASSWORD_RESET_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME_RESET_PASSWORD,
    to: client.email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <div style="text-align: center;">
        <p style="font-size: 18px;">Bonjour ${client.firstName},</p>
        <p style="font-size: 16px;">Vous avez demandé une réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <p style="margin-top: 20px;">
          <a href="${process.env.BASE_URL_FRONT}/account/reset-password/${resetToken}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Réinitialiser votre mot de passe</a>
        </p>
        <p style="font-size: 14px;">Pour des raisons de sécurité, le lien n'est valable que <b>15 minutes<b>.</p>
        <p style="font-size: 14px; margin-top: 20px;">Si le bouton ne fonctionne pas, veuillez copier et coller le lien suivant dans votre navigateur :</p>
        <p style="font-size: 14px;">${process.env.BASE_URL_FRONT}/account/reset-password/${resetToken}</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendPasswordResetEmail };
