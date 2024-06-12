import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
    maxlength: 50,
    required: true,
    unique: true,
  },
  value: { type: String, maxlength: 50, required: true },
  isArchived: { 
    type: Boolean,
    default: false,
  },
});

materialSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Material");
  }
  next();
});

const Material = mongoose.model("Material", materialSchema);

export default Material;
