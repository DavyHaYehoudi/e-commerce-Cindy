import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    shippingAddress: { type: String },
    totalOrders: { type: Number, default: 0 },
    totalOrderValue: { type: Number, default: 0 },
    notesAdmin: [
      {
        id: { type: String },
        content: { type: String },
        date: { type: Date },
      },
    ],
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        material: { type: Number },
        addDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        material: { type: Number },
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

const Client = mongoose.model("Client", clientSchema);
export default Client;
