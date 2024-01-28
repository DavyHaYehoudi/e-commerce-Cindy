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

const Credit = mongoose.model('Credit', creditSchema);
export default Credit;