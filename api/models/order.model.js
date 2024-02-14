import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const orderSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value >= 0 && value <= 6;
        },
        message: props => `${props.value} n'est pas un nombre entier entre 0 et 6!`
      }
    },
    isNextStepOrder: {
      type: Boolean,
      required: true,
      default: false,
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
            productsByOrder: [
              {
                id: {
                  type: String,
                  required: true,
                },
                productId: {
                  type: String,
                  required: true,
                },
                articlesNumber: {
                  type: Number,
                  required: true,
                },
                material: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
        default: [], 
      },
    lastSentDateToClient: {
      type: String,
      default:null
    },
    productsByOrder: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
orderSchema.pre('validate', function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, 'Order');
  }
  next();
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
