import OrderProducts from "../../models/orderProducts.model.js";
import Order from "../../models/order.model.js";

export async function checkSecondElement(req, step, trackingNumberList) {
  const errors = [];
  try {
    if (step === undefined) {
      throw new Error(
        "La propriété 'step' est manquante dans le deuxième élément."
      );
    }

    if (!Array.isArray(trackingNumberList)) {
      throw new Error(
        "La propriété 'trackingNumberList' doit être un tableau."
      );
    }

    const getOrder = await Order.findById({
      _id: req.params.orderId,
    });

    // Vérification si le document existe
    if (!getOrder) {
      throw new Error("Order non trouvé.");
    }
    const orderProductsIds = getOrder.orderProducts;
    // Récupérer les documents OrderProducts correspondants
    const orderProductsDocuments = await OrderProducts.find({
      _id: { $in: orderProductsIds },
    });

    if (
      !orderProductsDocuments ||
      orderProductsDocuments.length !== orderProductsIds.length
    ) {
      throw new Error(
        "Certains documents OrderProducts n'ont pas été trouvés."
      );
    }

    const orderProductsDetails = orderProductsDocuments.map((product) => ({
      productsId: product.productsId,
      quantity: product.quantity,
    }));

    return { errors };
  } catch (error) {
    console.log("error dans checkSecondElement.js:", error);
    return { errors: [error.message] };
  }
}
