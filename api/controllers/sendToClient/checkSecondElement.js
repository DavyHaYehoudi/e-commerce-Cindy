import ProductsByOrder from "../../models/productsByOrder.model.js";
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
    const productsByOrderIds = getOrder.productsByOrder;
    // Récupérer les documents ProductsByOrder correspondants
    const productsByOrderDocuments = await ProductsByOrder.find({
      _id: { $in: productsByOrderIds },
    });

    if (
      !productsByOrderDocuments ||
      productsByOrderDocuments.length !== productsByOrderIds.length
    ) {
      throw new Error(
        "Certains documents ProductsByOrder n'ont pas été trouvés."
      );
    }

    const productsByOrderDetails = productsByOrderDocuments.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    }));

    for (const trackingNumberItem of trackingNumberList) {
        try {
            const productsByOrderArray = trackingNumberItem.productsByOrder;

            for (const productByOrder of productsByOrderArray) {
              const productId = productByOrder.productId;
      
              if (
                !productsByOrderDetails.find((item) => item.productId === productId)
              ) {
                throw new Error("ProductId inexistant ou non associé à la commande.");
              }
      
              // Vérifier si articlesNumber ne dépasse pas quantity
              const articlesNumber = parseInt(productByOrder.articlesNumber, 10);
              const { quantity } = productsByOrderDetails.find(
                (item) => item.productId === productId
              );
      
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
    return {errors}
  } catch (error) {
    return { errors: [error.message] };
  }
}
