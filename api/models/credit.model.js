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
    required: true,
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
  const randomString = Math.random().toString(36).substring(2, 10);
}