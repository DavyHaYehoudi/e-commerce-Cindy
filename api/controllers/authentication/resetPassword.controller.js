import Client from "../../models/client.model.js";

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  console.log('token:', token)
  console.log('password:', password)

  try {
    // Vérification si le token est valide et s'il est encore dans la période de validité
    const client = await Client.findOne({
      resetPasswordToken: token,
    //   resetPasswordExpires: { $gt: Date.now() },
    });

    console.log('client:', client)
    if (!client) {
        return res.status(400).json({ message: "Le lien de réinitialisation du mot de passe n'est pas valide ou a expiré." });
    }

    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mise à jour du mot de passe dans la base de données
    client.authentication.password = hashedPassword;
    client.authentication.resetPasswordToken = null;
    client.authentication.resetPasswordExpires = null;
    await client.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la réinitialisation du mot de passe",
      });
  }
};
export { resetPassword };
