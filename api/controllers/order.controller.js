import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ProductsByOrder from "../models/productsByOrder.model.js";
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createOrder: async (req, res) => {
    // Implementation for creating a new client
  },
  updateOrder: async (req, res) => {
    try {
      console.log("req params ---------- :", req.params);
      console.log("req.body ---------- :", req.body);

      // Vérification des données du premier élément (tableau)
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

          if (refund !== null) {
            outTotalAmount += refund * currentPrice;
          }
        } catch (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }

      // Vérification des données du deuxième élément (objet)
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

      res.status(200).json({});
    } catch (error) {
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },

  // updateOrder: async (req, res) => {
  //   // ******************** Start Passage à l'étape suivante ********************
  //   const ordersActions = [
  //     { id: 0, number: 0 },
  //     { id: 1, number: 1 },
  //     { id: 2, number: 2 },
  //     { id: 3, number: 3 },
  //     { id: 4, number: 4 },
  //     { id: 5, number: 5 },
  //     { id: 6, number: 6 },
  //   ];

  //   const updateMoveToNextStep = (
  //     order,
  //     { step, isClientNotified, isNextStepOrder }
  //   ) => {
  //     const currentStepIndex = ordersActions.findIndex(
  //       (s) => s.number === order.step
  //     );

  //     const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
  //     const nextStep = isNextStepOrder
  //       ? ordersActions[nextStepIndex].number
  //       : step;

  //     order.step = nextStep;
  //     order.isClientNotified = isClientNotified;
  //     return {
  //       $set: {
  //         step: nextStep,
  //         isClientNotified,
  //       },
  //     };
  //   };
  //   // ******************** End Passage à l'étape suivante ********************
  //   // ******************** Start TrackingNumber ********************
  //   const updateOrderTrackingNumber = (action) => {
  //     const { actionType } = action;
  //     switch (actionType) {
  //       case "trackingNumberAddAdmin":
  //         return trackingNumberAddAdmin(action);
  //       case "trackingNumberDelete":
  //         return trackingNumberDelete(action);
  //       case "trackingNumberUpdatedClient":
  //         return trackingNumberUpdatedClient(action);
  //       default:
  //         return null;
  //     }
  //   };
  //   const trackingNumberAddAdmin = ({ trackingNumber }) => ({
  //     $push: {
  //       trackingNumber: trackingNumber,
  //     },
  //   });

  //   const trackingNumberDelete = ({ trackingNumber }) => ({
  //     $pull: {
  //       trackingNumber: { _id: trackingNumber._id },
  //     },
  //   });
  //   let arrayFilters;
  //   const trackingNumberUpdatedClient = ({ trackingNumber }) => {
  //     arrayFilters = [{ "elem._id": trackingNumber._id }];

  //     return {
  //       $set: {
  //         "trackingNumber.$[elem].productsByOrder":
  //           trackingNumber.productsByOrder,
  //       },
  //     };
  //   };

  //   // ******************** End TrackingNumber ********************
  //   try {
  //     const { orderId } = req.params;
  //     const { actionType, movement, isClientNotified, step, amount } = req.body;

  //     const existingOrder = await Order.findById(orderId);
  //     if (!existingOrder) {
  //       return res.status(404).json({ error: "Order not found" });
  //     }

  //     let updateQuery;
  //     let updatedOrder;

  //     switch (actionType) {
  //       case "moveToNextStep":
  //         updateQuery = updateMoveToNextStep(existingOrder, req.body);
  //         break;
  //       case "cancelOrder":
  //         updateQuery = {
  //           $set: { isClientNotified, step },
  //         };
  //         break;
  //       case "reactivateOrder":
  //         updateQuery = {
  //           $set: { isClientNotified, step },
  //         };
  //         break;
  //       case "sendToClient":
  //         updateQuery = {
  //           $set: { isClientNotified, lastSentDateToClient: new Date() },
  //         };
  //         break;
  //       case "totalsInOut":
  //         updateQuery = {
  //           $inc: {
  //             outTotalAmount: movement === "out" ? amount : -amount,
  //           },
  //           $set: { isClientNotified: false },
  //         };
  //         break;
  //       case "trackingNumberAddAdmin":
  //       case "trackingNumberDelete":
  //       case "trackingNumberUpdatedClient":
  //         updateQuery = updateOrderTrackingNumber(req.body);
  //         break;
  //       default:
  //         return res.status(400).json({ error: "Invalid action type" });
  //     }
  //     updatedOrder = await Order.findOneAndUpdate(
  //       { _id: orderId },
  //       updateQuery,
  //       { new: true, arrayFilters }
  //     );

  //     if (!updatedOrder) {
  //       return res.status(404).json({ error: "Order not found" });
  //     }

  //     res.status(200).json({
  //       message: "Order updated successfully",
  //       updatedOrder,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  deleteOrder: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default orderController;
