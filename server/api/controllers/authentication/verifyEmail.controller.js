import Client from "../../models/client.model.js";
import { sendNewClientEmail } from "./utils/emailNewClient.js";

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    const client = await Client.findOneAndUpdate(
      {
        "authentication.emailVerificationToken": token,
        "authentication.emailVerificationExpires": { $gt: Date.now() },
      },
      {
        "authentication.verified": true,
        "authentication.emailVerificationToken": null,
        "authentication.emailVerificationExpires": null,
      }
    );
    if (!client) {
      return res
        .status(400)
        .json({ message: "Le lien de vérification est invalide ou a expiré." });
    }
    sendNewClientEmail(client);
    return res.status(200).json({ email: client?.email });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'e-mail :", error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la vérification de l'e-mail.",
    });
  }
};

export { verifyEmail };
