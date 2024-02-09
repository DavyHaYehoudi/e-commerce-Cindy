import ProductsByOrder from "../../models/productsByOrder.model.js";
import Product from "../../models/product.model.js";

export async function checkFirstElement(productsByOrderArray) {
  let outTotalAmountCalc = 0;
  const errors = [];
  try {
    if (
      !Array.isArray(productsByOrderArray) ||
      productsByOrderArray.length < 1
    ) {
      throw new Error(
        "Le premier élément du tableau doit être un tableau non vide de productsByOrder."
      );
    }
    for (const item of productsByOrderArray) {
      try {
        const { productsByOrder, creditEdit } = item;

        if (!productsByOrder || !productsByOrder._id) {
          throw new Error(
            "L'objet 'productsByOrder' est manquant ou n'a pas de propriété '_id'."
          );
        }

        // Vérification spécifique pour productsByOrderActions
        const { productsByOrderActions } = productsByOrder;

        if (!productsByOrderActions) {
          throw new Error(
            "La propriété 'productsByOrderActions' est manquante ou null dans 'productsByOrder'."
          );
        }

        // Vérification de la cohérence entre creditEdit et productsByOrderActions.credit
        if (
          (creditEdit &&
            (!productsByOrderActions.credit ||
              productsByOrderActions.credit === null)) ||
          (!creditEdit && productsByOrderActions.credit)
        ) {
          throw new Error(
            "Si 'creditEdit' existe, alors 'productsByOrderActions.credit' doit également exister et ne pas être égal à null, et vice versa."
          );
        }

        // Récupérer le document ProductsByOrder
        const productsByOrderInDB = await ProductsByOrder.findOne({
          _id: productsByOrder._id,
        });

        if (!productsByOrderInDB) {
          throw new Error(
            `Le document ProductsByOrder avec l'ID ${productsByOrder._id} n'a pas été trouvé dans la base de données.`
          );
        }

        // Récupérer le prix du produit associé à productsByOrder
        const { productId } = productsByOrderInDB;

        if (!productId) {
          throw new Error(
            `La propriété 'productId' n'est pas définie pour le document ProductsByOrder avec l'ID ${productsByOrder._id}.`
          );
        }

        // Récupérer le document Product en utilisant productId
        const productInDB = await Product.findOne({ _id: productId });

        if (
          !productInDB ||
          !productInDB.pricing ||
          !productInDB.pricing.currentPrice
        ) {
          throw new Error(
            `La propriété 'currentPrice' n'est pas définie pour le document Product avec l'ID ${productId}.`
          );
        }

        const { currentPrice } = productInDB.pricing;

        // Vérification spécifique pour quantity dans ProductsByOrder
        const { quantity } = productsByOrder;
        if (quantity === undefined || quantity < 1 || quantity > 100) {
          throw new Error(
            `La propriété 'quantity' doit être présente et comprise entre 1 et 100.`
          );
        }
        // Vérification que refund + exchange <= quantity
        const { refund, exchange } = productsByOrderActions;
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
          outTotalAmountCalc += refund * currentPrice;
        }
      } catch (error) {
        errors.push(error.message);
      }
    } 
    return { outTotalAmountCalc, errors };
  } catch (error) {
    return { errors: [error.message] };
  } 
}
