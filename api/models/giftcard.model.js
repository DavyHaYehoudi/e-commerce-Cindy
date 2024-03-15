import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

// Fonction utilitaire pour générer un code secret
function generateSecretCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

// Schéma du modèle Giftcard
const giftcardSchema = new mongoose.Schema(
  {
    // Propriétés relatives à l'achat de la carte cadeau
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          const stringValue = value.toString();
          return stringValue.length <= 5;
        },
        message: "Le nombre total de chiffres ne doit pas dépasser 5.",
      },
    },
    // Propriétés relatives à la validité de la carte cadeau
    dateExpire: {
      type: Date,
      default: function () {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1); // Durée d'un an
        return currentDate;
      },
    },
    // Propriété relative au code secret de la carte cadeau
    code: {
      type: String,
      default: generateSecretCode,
    },
    // Propriété relative à l'utilisation de la carte cadeau par le consommateur
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pré-middleware pour générer un code secret avant la sauvegarde
giftcardSchema.pre("save", function (next) {
  const generatedCode = generateSecretCode();
  this.code = generatedCode;
  next();
});

// Pré-middleware pour gérer les erreurs de validation
giftcardSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Giftcard");
  }
  next();
});

const Giftcard = mongoose.model("Giftcard", giftcardSchema);

export default Giftcard;
