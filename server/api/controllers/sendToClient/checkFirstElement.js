import OrderProducts from "../../models/orderProducts.model.js";

export async function checkFirstElement(orderProductsArray) {
  let outTotalAmountCalc = 0;
  const errors = [];
  try {
    if (!Array.isArray(orderProductsArray) || orderProductsArray.length < 1) {
      throw new Error(
        "Le premier élément du tableau doit être un tableau non vide de orderProducts."
      );
    }
    for (const item of orderProductsArray) {
      try {
        const { orderProducts, creditEdit } = item;

        if (!orderProducts || !orderProducts._id) {
          throw new Error(
            "L'objet 'orderProducts' est manquant ou n'a pas de propriété '_id'."
          );
        }

        // Vérification spécifique pour orderProductsActions
        const { orderProductsActions } = orderProducts;

        if (!orderProductsActions) {
          throw new Error(
            "La propriété 'orderProductsActions' est manquante ou null dans 'orderProducts'."
          );
        }

        // Vérification de la cohérence entre creditEdit et orderProductsActions.credit
        if (
          (creditEdit &&
            (!orderProductsActions.credit ||
              orderProductsActions.credit === null)) ||
          (!creditEdit && orderProductsActions.credit)
        ) {
          throw new Error(
            "Si 'creditEdit' existe, alors 'orderProductsActions.credit' doit également exister et ne pas être égal à null, et vice versa."
          );
        }

        // Récupérer le document OrderProducts
        const orderProductsInDB = await OrderProducts.findOne({
          _id: orderProducts._id,
        });

        if (!orderProductsInDB) {
          throw new Error(
            `Le document OrderProducts avec l'ID ${orderProducts._id} n'a pas été trouvé dans la base de données.`
          );
        }
        const { finalPrice } = orderProductsInDB || "";

        // Vérification spécifique pour quantity dans OrderProducts
        const { quantity } = orderProducts;
        if (quantity === undefined || quantity < 1 || quantity > 100) {
          throw new Error(
            `La propriété 'quantity' doit être présente et comprise entre 1 et 100.`
          );
        }
        // Vérification que refund + exchange <= quantity
        const { refund, exchange } = orderProductsActions;
        const refundDefault = refund === null ? 0 : refund;
        const exchangeDefault = exchange === null ? 0 : exchange;
        if (refundDefault + exchangeDefault > quantity) {
          throw new Error(
            "La somme de 'refund' et 'exchange' ne doit pas dépasser la valeur de 'quantity'."
          );
        }
        // Calcul de la somme des sorties
        if (creditEdit) {
          outTotalAmountCalc += creditEdit.amount;
        }

        if (refund) {
          outTotalAmountCalc += refund * finalPrice;
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
    return { outTotalAmountCalc, errors };
  } catch (error) {
    console.log("error dans checkFirstElement.js:", error);
    return { errors: [error.message] };
  }
}
