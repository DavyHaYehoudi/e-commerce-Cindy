import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, maxLength: 50, required: true },
});

tagSchema.pre("validate", function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, "Tag");
  }
  next();
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
