import nodemailer from "nodemailer";


const sendPaymentEmail = async (email,orderNumber) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_PAYMENT,
    port: process.env.PORT_PAYMENT,
    secure: process.env.PORT_PAYMENT,
    auth: {
      user: process.env.EMAIL_USERNAME_PAYMENT,
      pass: process.env.EMAIL_PASSWORD_PAYMENT,
    },
    connectionTimeout: 10000,
    socketTimeout: 15000,
    pool: true,
    debug: true, 
    logger: true  
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME_PAYMENT,
    to: email,
    bcc: process.env.EMAIL_USERNAME_PAYMENT,
    subject: "Confirmation de payment",
    html: `<h1>Merci pour votre achat !</h1><p>Votre commande № ${orderNumber} a été confirmée.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendPaymentEmail };
