import Product from "../../../models/product/product.model.js";

const process = async (queries) => {
  const { name } = queries;
  let query = {};

  // Name
  if (name && name.trim() !== "") {
    query.$or = [
      { name: { $regex: new RegExp(name, "i") } },
    ];
  }
  const processedProducts = await Product.find(query)
  const processedTotalProductsCount = processedProducts.length
  return { processedProducts, processedTotalProductsCount };
};
export default process;
