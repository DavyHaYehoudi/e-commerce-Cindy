import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const orderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientSurname: {
      type: String,
      required: true,
    },
    shippingAddress: {
      firstName: { type: String, maxlength: 50, trim: true, required: true },
      lastName: { type: String, maxlength: 50, trim: true, required: true },
      phone: { type: String, maxlength: 20, default: "" },
      street: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
        maxlength: 200,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    billingAddress: {
      companyName: {
        type: String,
        maxlength: 200,
        default:""
      },
      firstName: { type: String, maxlength: 50, trim: true, required: true },
      lastName: { type: String, maxlength: 50, trim: true, required: true },
      street: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
        maxlength: 200,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
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
