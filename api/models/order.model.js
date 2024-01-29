import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      required: true,
      default: 0,
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
              },
            ],
          },
        ],
        default: [], 
      },
    isClientNotified: {
      type: Boolean,
      required: true,
      default: true,
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

const Order = mongoose.model("Order", orderSchema);
export default Order;
