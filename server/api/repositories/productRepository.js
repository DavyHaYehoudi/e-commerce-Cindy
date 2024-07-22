import Product from "../models/product/product.model.js";

const findById = async (id) => {
  return await Product.findById(id).lean();
};

export default {
  findById,
};
