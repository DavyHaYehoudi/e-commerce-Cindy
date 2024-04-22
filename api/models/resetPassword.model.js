import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "1h" } // Expiration automatique après 1 heure
  },
  {
    timestamps: true
  }
);

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);

export default PasswordResetToken;
