import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";
import bcrypt from "bcrypt";

const clientSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    firstName: { type: String, maxlength: 50, trim: true, required: true },
    lastName: { type: String, maxlength: 50, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
    phone: { type: String, default: "", maxlength: 20 },
    avatar: { type: String, defaut: null },
    shippingAddress: {
      firstName: { type: String, maxlength: 50, trim: true },
      lastName: { type: String, maxlength: 50, trim: true },
      street: {
        type: String,
        maxlength: 200,
      },
      apartment: {
        type: String,
        maxlength: 200,
      },
      city: {
        type: String,
        maxlength: 200,
      },
      postalCode: {
        type: String,
        maxlength: 200,
      },
      country: {
        type: String,
        maxlength: 200,
      },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
      },
      phone: { type: String, maxlength: 20, default: null },
    },
    billingAddress: {
      companyName: {
        type: String,
        maxlength: 200,
        default: "",
      },
      firstName: { type: String, maxlength: 50, trim: true },
      lastName: { type: String, maxlength: 50, trim: true },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
      },
      phone: { type: String, maxlength: 20, default: null },
      street: {
        type: String,
      },
      apartment: {
        type: String,
        maxlength: 200,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
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
// Middleware to hash the password before saving
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log("Error to save password in middleware client schema :", error);
    next(error);
  }
});

// Method to compare passwords
clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

clientSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Order");
  }
  next();
});
const Client = mongoose.model("Client", clientSchema);
export default Client;
