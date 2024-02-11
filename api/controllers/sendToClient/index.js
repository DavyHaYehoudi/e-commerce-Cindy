import { checkFirstElement } from "./checkFirstElement.js";
import { checkSecondElement } from "./checkSecondElement.js";
import { updateOrder } from "./updateOrder.js";
import { updateProductsByOrderActions } from "./updateProductsByOrderActions.js";
import { updateCredit } from "./updateCredit.js";

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
      // console.log('firstElementErrors:', firstElementErrors)

      const { errors: secondElementErrors } = await checkSecondElement(
        req,
        step,
        trackingNumberList
      );

      if (secondElementErrors.length > 0) {
        return res.status(400).json({ errors: secondElementErrors });
      }
      // console.log('secondElementErrors:', secondElementErrors)
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

      for (const item of productsByOrderArray) {
        try {
          const { productsByOrder, creditEdit } = item;
          const { productsByOrderActions } = productsByOrder;
          const { amount = null, dateExpire = null } = creditEdit || {};

          await updateCredit(productsByOrder, creditEdit, amount, dateExpire);
          await updateProductsByOrderActions(
            productsByOrder,
            productsByOrderActions
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
