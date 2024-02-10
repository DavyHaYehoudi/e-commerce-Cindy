import ProductsByOrder from "../../models/productsByOrder.model.js";

export const updateProductsByOrderActions = async (
  productsByOrder,
  productsByOrderActions
) => {
  try {
    const productsByOrderInDB = await ProductsByOrder.findById(
      productsByOrder._id
    );
    if (!productsByOrderInDB) {
      console.error("ProductsByOrder non trouvé");
      return;
    }
    await ProductsByOrder.updateOne(
      { _id: productsByOrder._id },
      {
        $set: {
          productsByOrderActions,
        },
      }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de productsByOrder :", error);
  }
};
