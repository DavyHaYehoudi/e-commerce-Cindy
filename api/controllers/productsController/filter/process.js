import Product from "../../../models/product/product.model.js";

const process = async (queries) => {
  // console.log("queries:", queries);
  const {
    name = null,
    collection = null,
    categories = null,
    others = null,
  } = queries;

  let processedProducts;
  let processedTotalProductsCount;
  let query = {};

  // Name
  if (name && name !== "null") {
    query.$or = [{ name: { $regex: new RegExp(name, "i") } }];
    processedProducts = await Product.find(query);
  }

  //   Plusieurs cas.
  // 1- Seulement 'collection'
  // 2- seulement 'categories'
  // 3-Seulement 'others'
  // 4- Collection et categories
  // 5-Collection et others
  // 6- categories et others

  // Collection
  if (collection && collection !== "null") {
    query._collection = collection;
  }

  // Others
  if (others && others !== "null") {
    const otherQueries = [];

    for (let other of others.split(",")) {
      const propertyName = other.trim();

      if (propertyName === "promotion") {
        otherQueries.push({
          "materials.promotion.endDate": { $gt: new Date() },
        });
      } else if (propertyName === "untilNew") {
        otherQueries.push({
          "materials.untilNew": { $gt: new Date() },
        });
      } else if (propertyName === "pending") {
        otherQueries.push({ isActive: false });
      } else {
        otherQueries.push({
          [`materials.${propertyName}`]: true,
        });
      }
    }

    if (otherQueries.length > 0) {
      query.$or = otherQueries;
    }
  }

  // Categories
  if (categories && categories !== "" && categories !== "null") {
    const categoryIds = categories.split(",");
    query.category = { $in: categoryIds };
  }

  processedProducts = await Product.find(query);
  processedTotalProductsCount = processedProducts.length;
  return { processedProducts, processedTotalProductsCount };
};
export default process;
