import OrderProducts from "../../models/orderProducts.model.js";

export const updateOrderProductsActions = async (
  orderProducts,
  orderProductsActions
) => {
  try {
    const orderProductsInDB = await OrderProducts.findById(
      orderProducts._id
    );
    if (!orderProductsInDB) {
      console.error("OrderProducts non trouvé");
      return;
    }
    await OrderProducts.updateOne(
      { _id: orderProducts._id },
      {
        $set: {
          orderProductsActions,
        },
      },
      { runValidators: true }
    );
  } catch (error) {
    console.log(
      "Erreur lors de la mise à jour de updateOrderProductsActions"
    );
    throw error
  }
};
