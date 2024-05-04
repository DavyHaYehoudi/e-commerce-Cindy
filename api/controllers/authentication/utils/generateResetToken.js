import jwt from "jsonwebtoken";
// Fonction pour générer un token de réinitialisation
export const generateResetToken = async (client) => {
  try {
    const resetToken = jwt.sign(
      { clientId: client._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      })

    // Enregistrement du token dans la base de données
    client.authentication.resetPasswordToken = resetToken;
    client.authentication.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    ); // 15 minutes d'expiration
    await client.save();
    return resetToken;
  } catch (error) {
    throw new Error(
      "Erreur lors de la génération du token de réinitialisation : " +
        error.message
    );
  }
};
