import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const orderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    shippingAddress: {
      firstName: { type: String, maxlength: 100, trim: true, required: true },
      lastName: { type: String, maxlength: 100, trim: true, required: true },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
        required: true,
      },
      phone: { type: String, maxlength: 100, default: null, required: true },
      street: {
        type: String,
        required: true,
        maxlength: 100,
      },
      apartment: {
        type: String,
        maxlength: 100,
      },
      city: {
        type: String,
        required: true,
        maxlength: 100,
      },
      postalCode: {
        type: String,
        required: true,
        maxlength: 100,
      },
      country: {
        type: String,
        required: true,
        maxlength: 100,
      },
    },
    billingAddress: {
      companyName: {
        type: String,
        maxlength: 100,
        default: "",
      },
      firstName: { type: String, maxlength: 100, trim: true, required: true },
      lastName: { type: String, maxlength: 100, trim: true, required: true },
      email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        trim: true,
        default: null,
        required: true,
      },
      phone: { type: String, maxlength: 100, default: null },
      street: {
        type: String,
        required: true,
        maxlength: 100,
      },
      apartment: {
        type: String,
        maxlength: 100,
      },
      city: {
        type: String,
        required: true,
        maxlength: 100,
      },
      postalCode: {
        type: String,
        required: true,
        maxlength: 100,
      },
      country: {
        type: String,
        required: true,
        maxlength: 100,
      },
    },
    step: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value >= 0 && value <= 6;
        },
        message: (props) =>
          `${props.value} n'est pas un nombre entier entre 0 et 6!`,
      },
    },
    inTotalAmount: {
      type: Number,
      required: true,
    },
    outTotalAmount: { 
      type: Number,
      required: true,
      default: 0,
    }, 
    amountPromoCode:{
      type: Number,
      default:null
    },
    paymentMethod: {
      cardType: {
        type: String,
        required: true,
      },
      last4Digits: {
        type: String,
        required: true,
      },
    },
    trackingNumber: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          isAdmin: {
            type: Boolean,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          orderProducts: [
            {
              id: {
                type: String,
                required: true,
              },
              productsId: {
                type: String,
                required: true,
              },
              articlesNumber: {
                type: Number,
                required: true,
                validate: {
                  validator: function (value) {
                    return value >= 1 && value <= 100;
                  },
                  message: (props) =>
                    `${props.value} n'est pas compris entre 1 et 100!`,
                },
              },
              material: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Material",
              },
            },
          ],
        },
      ],
      default: [],
    },
    lastSentDateToClient: {
      type: String,
      default: null,
    },
    orderProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "OrderProducts" },
    ],
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Order");
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
