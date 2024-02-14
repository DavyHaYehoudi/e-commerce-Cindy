import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  materials: {
    type: [Number],
    default: [0],
  },
  promotion: {
    type: {
      amount: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
    },
    default: null,
  },
  pricing: {
    currentPrice: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
  },
  stock: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
  },
  options: {
    color: {
      type: [String],
    },
  },
  tags: {
    type: [String],
  },
  isNewProduct: {
    type: Boolean,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
