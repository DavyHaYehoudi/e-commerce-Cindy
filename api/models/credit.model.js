import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
  productsByOrderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    default: generateSecretCode,
  },
  dateExpire: {
    type: String,
    required: true,
  },
});

// Clé secrète pour la propriété "code"
creditSchema.pre('save', function (next) {
  const generatedCode = generateSecretCode();
  this.code = generatedCode;
  next();
});

const Credit = mongoose.model('Credit', creditSchema);
export default Credit;

function generateSecretCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  
  return code;
}