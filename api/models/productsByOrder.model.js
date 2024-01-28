import mongoose from "mongoose";

const productsByOrderSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  material: {
    type: Number,
    required: true,
  },
  isClientNotified: {
    type: Boolean,
    required: true,
  },
  productsByOrderActions: {
    exchange: {
      type: Number,
      default: null,
    },
    refund: {
      type: Number,
      default: null,
    },
    credit: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
  },
});

const ProductsByOrder = mongoose.model('ProductsByOrder', productsByOrderSchema);
export default ProductsByOrder;