import { analytic } from "./analytic.js";
import { credit } from "./credit.js";
import { exchange } from "./exchange.js";
import { giftcard } from "./giftcard.js";
import { refund } from "./refund.js";

const statisticController = {
  getAllStatistics: async (req, res) => {
    try {
      const { year } = req.params;

      // Analytic
      const {
        ordersCount,
        ordersCanceled,
        currentMonthOrdersCount,
        averageByOrder,
        topSellingProducts,
        topCartProducts,
      } = await analytic(year);

      // Credit
      const {
        totalCredits,
        usedCredits,
        usedCreditDetails,
        activeCredits,
        activeCreditDetails,
      } = await credit(year);

      // Exchange
      const { totalExchanges, exchangeDetails } = await exchange(year);

      // Refund
      const { refundDetails } = await refund(year);

      // Giftcard
      const {
        totalGiftcards,
        totalAmountGiftcards,
        validGiftcards,
        totalAmountValidGiftcards,
        validGiftcardsDetails,
        usedGiftcards,
        totalAmountUsedGiftcards,
        usedGiftcardsDetails,
      } = await giftcard(year);
      res.status(200).json({
        ordersCount,
        ordersCanceled,
        currentMonthOrdersCount,
        averageByOrder,
        topSellingProducts,
        topCartProducts,
        totalCredits,
        usedCredits,
        usedCreditDetails,
        activeCredits,
        activeCreditDetails,
        totalExchanges,
        exchangeDetails,
        totalGiftcards,
        totalAmountGiftcards,
        validGiftcards,
        totalAmountValidGiftcards,
        validGiftcardsDetails,
        usedGiftcards,
        totalAmountUsedGiftcards,
        usedGiftcardsDetails,
        refundDetails,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default statisticController;
