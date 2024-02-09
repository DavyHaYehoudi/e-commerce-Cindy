import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import ProductsByOrder from "../models/productsByOrder.model.js";

const sendToClientController = {
  updateOrder: async (req, res) => {
    try {
      console.log("req params ---------- :", req.params);
      console.log("req.body ---------- :", req.body);

      // *************************** Vérification des données du premier élément (tableau) ***************************
      const productsByOrderArray = req.body[0];

      if (
        !Array.isArray(productsByOrderArray) ||
        productsByOrderArray.length < 1
      ) {
        throw new Error(
          "Le premier élément du tableau doit être un tableau non vide de productsByOrder."
        );
      }
      let outTotalAmount = 0;
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
            return res.status(400).json({
              error:
                "Si 'creditEdit' existe, alors 'productsByOrderActions.credit' doit également exister et ne pas être égal à null, et vice versa.",
            });
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
          if (
            refund !== null &&
            exchange !== null &&
            refund + exchange > quantity
          ) {
            throw new Error(
              "La somme de 'refund' et 'exchange' ne doit pas dépasser la valeur de 'quantity'."
            );
          }
          // Calcul de la somme des sorties
          if (creditEdit) {
            outTotalAmount += creditEdit.amount;
          }

          if (refund) {
            outTotalAmount += refund * currentPrice;
          }
        } catch (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }

      // *************************** Vérification des données du deuxième élément (objet) ***************************
      const { step, trackingNumberList } = req.body[1];

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
      if (trackingNumberList.length === 0) {
        return res.status(200).json({
          message:
            "TrackingNumberList est vide. Aucune vérification nécessaire.",
        });
      }
      const getOrder = await Order.findById({
        _id: req.params.orderId,
      });

      // Vérification si le document existe
      if (!getOrder) {
        return res.status(404).json({
          error: "Order non trouvé.",
        });
      }
      const productsByOrderIds = getOrder.productsByOrder;
      // Récupérer les documents ProductsByOrder correspondants
      const productsByOrderDocuments = await ProductsByOrder.find({
        _id: { $in: productsByOrderIds },
      });

      // Vérification si les documents existent
      if (
        !productsByOrderDocuments ||
        productsByOrderDocuments.length !== productsByOrderIds.length
      ) {
        return res.status(404).json({
          error: "Certains documents ProductsByOrder n'ont pas été trouvés.",
        });
      }

      const productsByOrderDetails = productsByOrderDocuments.map(
        (product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })
      );

      console.log("productsByOrderDetails:", productsByOrderDetails);
      // Vérifier chaque objet dans trackingNumberList
      for (const trackingNumberItem of trackingNumberList) {
        const productsByOrderArray = trackingNumberItem.productsByOrder;

        for (const productByOrder of productsByOrderArray) {
          // Vérifier si productId existe dans productsByOrderDetails
          const productId = productByOrder.productId;

          if (
            !productsByOrderDetails.find((item) => item.productId === productId)
          ) {
            console.log(
              "************* je suis dans erreur if (!productId || !productsByOrderDetails[productId]) "
            );
            return res.status(400).json({
              error: "ProductId inexistant ou non associé à la commande.",
            });
          }

          // Vérifier si articlesNumber ne dépasse pas quantity
          const articlesNumber = parseInt(productByOrder.articlesNumber, 10);
          const { quantity } = productsByOrderDetails.find(
            (item) => item.productId === productId
          );

          if (isNaN(articlesNumber) || articlesNumber > quantity) {
            console.log("je suis dans erreur if (articlesNumber > quantity)");
            return res.status(400).json({
              error:
                "ArticlesNumber ne peut pas dépasser la quantité commandée.",
            });
          }
        }
      }

      res.status(200).json({});
    } catch (error) {
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },
};
export default sendToClientController;
