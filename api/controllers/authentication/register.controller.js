import Client from "../../models/client.model.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    // Création d'un nouvel utilisateur
    const newClient = new Client({
        email,
        password, // Le mot de passe sera hashé automatiquement grâce au middleware dans le modèle
    });

    // Enregistrement de l'utilisateur dans la base de données
    await newClient.save();

    res.status(201).json({ message: "Compte utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création du compte utilisateur :", error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la création du compte utilisateur.",
      });
  }
};

export { register };
