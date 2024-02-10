import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const creditSchema = new mongoose.Schema({
  productsByOrderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (amount) {
        return amount > 0;
      },
      message: "Le montant doit être supérieur à zéro.",
    },
  },
  code: {
    type: String,
    default: generateSecretCode,
  },
  dateExpire: {
    type: String,
    required: true,
    validate: {
      validator: function (dateExpire) {
        // Vérifie si la date d'expiration est au moins celle du lendemain
        const currentDate = new Date();
        const expirationDate = new Date(dateExpire);
        expirationDate.setDate(expirationDate.getDate() + 1); // Ajoute un jour à la date d'expiration

        return expirationDate >= currentDate;
      },
      message: "La date d'expiration choisie doit être au moins celle du lendemain.",
    },
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

// Clé secrète pour la propriété "code"
creditSchema.pre('save', function (next) {
  const generatedCode = generateSecretCode();
  this.code = generatedCode;
  next();
});
creditSchema.pre('validate', function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, 'Credit');
  }
  next();
});
const Credit = mongoose.model('Credit', creditSchema);
export default Credit;

function generateSecretCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  
  return code;
}