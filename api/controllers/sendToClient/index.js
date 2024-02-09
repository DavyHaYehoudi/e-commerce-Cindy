import mongoose from "mongoose";
import { checkFirstElement } from "./checkFirstElement.js";
import { checkSecondElement } from "./checkSecondElement.js";
import Order from "../../models/order.model.js";

const sendToClientController = {
  updateOrder: async (req, res) => {
    const { orderId } = req.params;
    const productsByOrderArray = req.body[0];
    const { step, trackingNumberList } = req.body[1];
    let outTotalAmount;

    try {
      const { outTotalAmountCalc, errors: firstElementErrors } =
        await checkFirstElement(productsByOrderArray);

      if (firstElementErrors.length > 0) {
        return res.status(400).json({ errors: firstElementErrors });
      }

      const { errors: secondElementErrors } = await checkSecondElement(
        req,
        step,
        trackingNumberList
      );

      if (secondElementErrors.length > 0) {
        return res.status(400).json({ errors: secondElementErrors });
      }
      outTotalAmount = outTotalAmountCalc;
    } catch (error) {
      return res.status(500).json({
        error: `** Erreur interne du serveur dans index.js **: ${error.message}`,
      });
    }
    // Mises à jour MongoDB dans la transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // console.log("req.body[0] :", req.body[0]);
      // console.log("req.body[1] :", req.body[1]);
      // console.log("outTotalAmount :", outTotalAmount);

      for (const item of productsByOrderArray) {
        try {
          const { productsByOrder, creditEdit } = item;
          // console.log("creditEdit:", creditEdit);
          // console.log(
          //   "productsByOrderActions:",
          //   productsByOrder.productsByOrderActions
          // );
        } catch (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      if (trackingNumberList) {
        console.log("trackingNumberList:", trackingNumberList);
      }
      console.log("step:", step);

      const updateOrder = async () => {
        try {
          const order = await Order.findById(orderId);

          if (!order) {
            console.error("Commande non trouvée");
            return;
          }
          const result = await Order.updateOne(
            { _id: orderId },
            {
              $set: {
                trackingNumber: trackingNumberList,
                step,
                outTotalAmount,
              },
            }
          );

          console.log("Mise à jour réussie :", result);
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour de la commande :",
            error
          );
        }
      };

      updateOrder();

      // Si tout va bien, commit la transaction
      // await session.commitTransaction();
      // session.endSession();

      res.status(200).json({});
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },
};
export default sendToClientController;
