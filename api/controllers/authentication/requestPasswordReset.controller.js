import Client from '../../models/client.model.js';
import { generateResetToken } from './utils/generateResetToken.js';

// Contrôleur pour demander une réinitialisation du mot de passe
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    // Génération d'un token de réinitialisation
    const resetToken = await generateResetToken(client._id);
    console.log('resetToken:', resetToken)

    // Envoi d'un e-mail à l'utilisateur avec le lien contenant le token
    // (Vous devrez implémenter cette partie en utilisant un service d'e-mail comme Nodemailer)

    res.status(200).json({ message: "Un e-mail avec les instructions pour réinitialiser votre mot de passe a été envoyé." });
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation du mot de passe :", error);
    res.status(500).json({ message: "Erreur serveur lors de la demande de réinitialisation du mot de passe." });
  }
};

export { requestPasswordReset };
