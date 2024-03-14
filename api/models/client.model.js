import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const clientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, default: "", maxlength: 20 },
    shippingAddress: { type: String, required: true, maxlength: 200 },
    totalOrders: { type: Number, default: 0 },
    totalOrderValue: { type: Number, default: 0 },
    notesAdmin: [
      {
        content: {
          type: String,
          maxlength: 500,
        },
        date: {
          type: Date,
        },
      },
    ],
    wishlist: [
      {
        productsId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
        addDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart: [
      {
        productsId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
        quantity: { type: Number, default: 1 },
        addDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);
clientSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Order");
  }
  next();
});
const Client = mongoose.model("Client", clientSchema);
export default Client;
