import mongoose from "mongoose";
import { handleValidationErrors } from "../errorModelHandler.js";
import materialsSchema from "./materials.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    _collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    },
    secondary_images: { type: [String] },
    main_description: {
      type: String,
      default:""
    },
    materials: {
      type: [materialsSchema],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Products");
  }
  next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
