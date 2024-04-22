import PasswordResetToken from "../../../models/resetPassword.model.js";

// Fonction pour générer un token de réinitialisation
export const generateResetToken = async (clientId) => {
  try {
    // Suppression des anciens tokens de réinitialisation pour cet utilisateur
    await PasswordResetToken.deleteMany({ clientId });

    // Génération d'un token unique
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log('resetToken:', resetToken)

    // Enregistrement du token dans la base de données
    await new PasswordResetToken({ clientId, token: resetToken }).save();
    console.log('PasswordResetToken:', PasswordResetToken)

    return resetToken;
  } catch (error) {
    throw new Error(
      "Erreur lors de la génération du token de réinitialisation."
    );
  }
};
