import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, maxLength: 50, required: true },
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
