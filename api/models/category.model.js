import mongoose from "mongoose";
import { handleValidationErrors } from "./errorModelHandler.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, maxLength: 50, required: true, unique: true },
  parentCollection: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    validate: [
      {
        validator: function(arr) {
          return arr.length > 0; 
        },
        message: "Le champ 'parentCollection' ne peut pas être vide."
      }
    ]
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
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
