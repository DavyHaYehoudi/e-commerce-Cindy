import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";
import bcrypt from "bcrypt";

const clientSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    firstName: { type: String, maxlength: 100, trim: true, required: true },
    lastName: { type: String, maxlength: 100, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      lowercase: true,
      trim: true,
      required: true,
    },
    phone: { type: String, default: "", maxlength: 100 },
    avatar: { type: String, default: "avatars/default-avatar.svg" },
    shippingAddress: {
      firstName: { type: String, maxlength: 100, trim: true },
      lastName: { type: String, maxlength: 100, trim: true },
      street: {
        type: String,
        maxlength: 100,
      },
      apartment: {
        type: String,
        maxlength: 100,
      },
      city: {
        type: String,
        maxlength: 100,
      },
      postalCode: {
        type: String,
        maxlength: 100,
      },
      country: {
        type: String,
        maxlength: 100,
      },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
      },
      phone: { type: String, maxlength: 100, default: null },
    },
    billingAddress: {
      companyName: {
        type: String,
        maxlength: 100,
        default: "",
      },
      firstName: { type: String, maxlength: 100, trim: true },
      lastName: { type: String, maxlength: 100, trim: true },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
      },
      phone: { type: String, maxlength: 100, default: null },
      street: {
        type: String,
        maxlength: 100,
      },
      apartment: {
        type: String,
        maxlength: 100,
      },
      city: {
        type: String,
        maxlength: 100,
      },
      postalCode: {
        type: String,
        maxlength: 100,
      },
      country: {
        type: String,
        maxlength: 100,
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
        quantity: { type: Number, default: 1 },
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
    authentication: {
      password: { type: String, required: true },
      verified: { type: Boolean, default: false },
      emailVerificationToken: {
        type: String,
        default: null,
      },
      emailVerificationExpires: { type: Date, default: null },
      resetPasswordToken: {
        type: String,
        default: null,
      },
      resetPasswordExpires: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);
// Middleware to hash the password before saving
clientSchema.pre("save", async function (next) {
  if (!this.authentication || !this.isModified("authentication.password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.authentication.password = await bcrypt.hash(
      this.authentication.password,
      salt
    );
    next();
  } catch (error) {
    console.log(
      "Erreur lors de la sauvegarde du mot de passe dans le middleware du schéma client :",
      error
    );
    next(error);
  }
});

// Method to compare passwords
clientSchema.methods.comparePassword = async function (password) {
  if (!this.authentication || !this.authentication.password) {
    return false; // Aucun mot de passe enregistré
  }
  return await bcrypt.compare(password, this.authentication.password);
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
