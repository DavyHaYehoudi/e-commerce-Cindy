import Client from "../../models/client.model.js";
import { generateJWTToken } from "./utils/jwt.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }
    if (!client.authentication.verified) {
      return res
        .status(401)
        .json({
          message:
            "Adresse e-mail non vérifiée. Veuillez vérifier votre boîte de réception pour le lien de vérification.",
        });
    }
    const isMatch = await client.comparePassword(password);

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Mot de passe incorrect." });
    // }
    const isAdmin = client.role === "admin";
    const token = generateJWTToken(client, isAdmin);

    res.status(200).json({ token, isAdmin });
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'authentification." });
  }
};
 
export { login };
 