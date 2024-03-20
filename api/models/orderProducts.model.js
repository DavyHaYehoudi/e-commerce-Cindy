import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const orderProductsSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 10;
        },
        message: (props) => `${props.value} n'est pas compris entre 0 et 10!`,
      },
    },
    orderProductsActions: {
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
      exchangeDate: { type: Date, default: null },
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
      refundDate: { type: Date, default: null },
      credit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderProducts",
        default: null,
      },

      note: {
        type: String,
        default: null,
        maxlength: [500, "La note doit avoir au maximum 500 caractères."],
      },
    },
  },
  {
    timestamps: true,
  }
);
orderProductsSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "OrderProducts");
  }
  next();
});
const OrderProducts = mongoose.model("OrderProducts", orderProductsSchema);
export default OrderProducts;
