import mongoose from "mongoose";
import { handleValidationErrors } from "../errorModelHandler.js";

const materialsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
      main_image: {
        type: String,
        required: true,
      },
      pricing: {
        currentPrice: {
          type: Number,
          required: true,
        },
        oldPrice: {
          type: Number,
          default: null,
        },
      },
      untilNew: {
        type: Date,
        default: new Date(),
      },
      promotion: {
        type: {
            amount: {
                type: Number,
                default: null,
            },
            startDate: { 
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
        },
        default: null
    },
      stock: {
        type: Number,
        default: 1,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
});
materialsSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Materials");
  }
  next();
});
export default materialsSchema;
