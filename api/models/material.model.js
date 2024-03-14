import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, default: null },
  value: { type: String, default: null },
});

const Material = mongoose.model('Material', materialSchema);

export default Material;
 