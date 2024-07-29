import nodemailer from "nodemailer";

const sendNewClientEmail = async (client) => {
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
    to: process.env.EMAIL_USERNAME_REGISTER,
    subject: "Nouveau client",
    html: `<h1>Un nouveau client vient de s'enregistrer !</h1>
    <ul>
    <li>Nom : ${client?.lastName} </li>
    <li>Prénom : ${client?.firstName} </li>
    <li>Email : ${client?.email} </li>
    </ul>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendNewClientEmail };
