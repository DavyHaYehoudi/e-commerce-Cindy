import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const collectionSchema = new mongoose.Schema({
  name: { type: String, maxLength: 50, required: true },
});

collectionSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Collection");
  }
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
