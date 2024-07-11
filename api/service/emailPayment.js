import nodemailer from "nodemailer";


const sendPaymentEmail = async (client,orderNumber) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_PAYMENT,
    port: process.env.PORT_PAYMENT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME_PAYMENT,
      pass: process.env.EMAIL_PASSWORD_PAYMENT,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME_PAYMENT,
    to: client.email,
    subject: "Confirmation de payment",
    html: `<h1>Merci pour votre achat!</h1><p>Votre commande № ${orderNumber} a été confirmée.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendPaymentEmail };
