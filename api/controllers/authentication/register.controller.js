import Client from "../../models/client.model.js";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "./utils/emailRegister.js";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res
        .status(400)
        .json({ messageError: "Adresse email déjà utilisée 🤨" });
    }

    const newClient = new Client({
      firstName,
      lastName,
      email,
      authentication: {
        password,
      },
    });

    await newClient.save();
    const verificationToken = generateVerificationToken(newClient);
    newClient.authentication.emailVerificationToken = verificationToken;
    newClient.authentication.emailVerificationExpires = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 heures d'expiration
    
    await newClient.save();
    await sendVerificationEmail(newClient, verificationToken);

    res.status(201).json({ message: "Compte utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création du compte utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du compte utilisateur.",
    });
  }
};

export { register };
