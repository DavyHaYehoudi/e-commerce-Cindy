import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, maxLength: 50, required: true, unique: true },
  parentCollection: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  ],
});

categorySchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Category");
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
