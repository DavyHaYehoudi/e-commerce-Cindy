import Client from "../../models/client.model.js";
import { sendPasswordResetEmail } from "./utils/emailResetPassword.js";
import { generateResetToken } from "./utils/generateResetToken.js";

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    const resetToken = await generateResetToken(client);

    await sendPasswordResetEmail(client, resetToken);
    res
      .status(200)
      .json({
        message:
          "Un e-mail avec les instructions pour réinitialiser votre mot de passe a été envoyé.",
      });
  } catch (error) {
    console.error(
      "Erreur lors de la demande de réinitialisation du mot de passe :",
      error
    );
    res
      .status(500)
      .json({
        message:
          "Erreur serveur lors de la demande de réinitialisation du mot de passe.",
      });
  }
};

export { requestPasswordReset };
