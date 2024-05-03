import Client from "../../models/client.model.js";

const resetPassword = async (req, res) => {
  const { password, token } = req.body;

  try {
    // Vérification si le token est valide et s'il est encore dans la période de validité
    const client = await Client.findOne({
      "authentication.resetPasswordToken": token,
      "authentication.resetPasswordExpires": { $gt: Date.now() },
    });

    if (!client) {
      return res
        .status(400)
        .json({
          message:
            "Le lien de réinitialisation du mot de passe n'est pas valide ou a expiré.",
        });
    }

    client.authentication.password = password;
    client.authentication.resetPasswordToken = null;
    client.authentication.resetPasswordExpires = null; 
    await client.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error 
    ); 
    res.status(500).json({
      message: "Erreur serveur lors de la réinitialisation du mot de passe",
    });
  }
};
export { resetPassword };
