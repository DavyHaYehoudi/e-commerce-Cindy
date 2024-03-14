import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, default: null },
  value: { type: String, default: null },
});

materialSchema.pre('validate', function (next) {
  const error = this.validateSync();
  if (error) {
    handleValidationErrors(error, 'Material');
  }
  next();
});

const Material = mongoose.model('Material', materialSchema);

export default Material;
 