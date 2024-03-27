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

    for (const trackingNumberItem of trackingNumberList) {
      try {
        const orderProductsArray = trackingNumberItem.orderProducts;

        for (const productByOrder of orderProductsArray) {
          const productsId = productByOrder.productsId;
          const { orderProductsId } = productByOrder;

          if (
            !orderProductsDetails.find((item) => item.productsId.equals(productsId) )
          ) {
            throw new Error(
              "ProductsId inexistant ou non associé à la commande."
            );
          }

          // Vérifier si articlesNumber ne dépasse pas quantity
          const { quantity } =
            (await OrderProducts.findOne({
              _id: orderProductsId,
            })) || {};
          const articlesNumber = parseInt(productByOrder.articlesNumber, 10);

          if (isNaN(articlesNumber) || articlesNumber > quantity) {
            throw new Error(
              "ArticlesNumber ne peut pas dépasser la quantité commandée."
            );
          }
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
    return { errors };
  } catch (error) {
    console.log("error dans checkSecondElement.js:", error);
    return { errors: [error.message] };
  }
}
