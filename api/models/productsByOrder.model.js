import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const productsByOrderSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 1 && value <= 100;
      },
      message: (props) => `${props.value} n'est pas compris entre 1 et 100!`,
    },
  },
  material: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 20;
      },
      message: (props) => `${props.value} n'est pas compris entre 0 et 10!`,
    },
  },
  isClientNotified: {
    type: Boolean,
    required: true,
  },
  productsByOrderActions: {
    exchange: {
      type: Number,
      default: null,
      validate: {
        validator: (value) =>
          value === null || (typeof value === "number" && value > 0),
        message:
          "La propriété 'exchange' doit être de type null ou un nombre supérieur à 0.",
      },
    },
    refund: {
      type: Number,
      default: null,
      validate: {
        validator: (value) =>
          value === null || (typeof value === "number" && value > 0),
        message:
          "La propriété 'refund' doit être de type null ou un nombre supérieur à 0.",
      },
    },
    credit: {
      type: String,
      default: null,
    },

    note: {
      type: String,
      default: null,
      validate: {
        validator: (value) =>
          value === null || (typeof value === "string" && value.length <= 1000),
        message:
          "La note doit être de type null ou une chaîne de caractères de longueur maximale 1000.",
      },
    },
  },
});
productsByOrderSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "ProductsByOrder");
  }
  next();
});
const ProductsByOrder = mongoose.model(
  "ProductsByOrder",
  productsByOrderSchema
);
export default ProductsByOrder;
