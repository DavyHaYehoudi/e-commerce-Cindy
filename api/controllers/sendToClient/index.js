import { checkFirstElement } from "./checkFirstElement.js";
import { checkSecondElement } from "./checkSecondElement.js";
import { updateOrder } from "./updateOrder.js";
import { updateOrderProductsActions } from "./updateOrderProductsActions.js";
import { updateCredit } from "./updateCredit.js";

const sendToClientController = {
  updateOrder: async (req, res) => {
    const { orderId } = req.params;
    const orderProductsArray = req.body[0];
    const { step, trackingNumberList } = req.body[1];
    let outTotalAmount;

    try {
      const { outTotalAmountCalc, errors: firstElementErrors } =
        await checkFirstElement(orderProductsArray);

      if (firstElementErrors.length > 0) {
        console.log('firstElementErrors:', firstElementErrors)
        return res.status(400).json({ errors: firstElementErrors });
      }

      const { errors: secondElementErrors } = await checkSecondElement(
        req,
        step,
        trackingNumberList
      );

      if (secondElementErrors.length > 0) {
        console.log('secondElementErrors:', secondElementErrors)
        return res.status(400).json({ errors: secondElementErrors });
      }
      outTotalAmount = outTotalAmountCalc;
    } catch (error) {
      return res.status(500).json({
        error: `** Erreur interne du serveur dans index.js **: ${error.message}`,
      });
    }

    try {
      const lastSentDateToClient = new Date();
      await updateOrder(
        orderId,
        trackingNumberList,
        step,
        outTotalAmount,
        lastSentDateToClient
      );

      for (const item of orderProductsArray) {
        try {
          const { orderProducts, creditEdit } = item;
          const { orderProductsActions } = orderProducts;
          const { amount = null, dateExpire = null } = creditEdit || {};

          await updateCredit(orderProducts, creditEdit, amount, dateExpire);
          await updateOrderProductsActions(
            orderProducts,
            orderProductsActions
          );
        } catch (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      res.status(200).json({
        lastSentDateToClient,
      });
      // res.status(400).json({})
      // res.status(500).json({})
    } catch (error) {
      console.log("error:", error);
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },
};
export default sendToClientController;
