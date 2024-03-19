import { analytic } from "./analytic.js";
import { credit } from "./credit.js";

const statisticController = {
  getAllStatistics: async (req, res) => {
    try {
      const { year } = req.params;

      // Analytic
      const {
        ordersCount,
        ordersCanceled,
        currentMonthOrdersCount,
        average,
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

      res.status(200).json({
        ordersCount,
        ordersCanceled,
        currentMonthOrdersCount,
        average,
        topSellingProducts,
        topCartProducts,
        totalCredits,
        usedCredits,
        usedCreditDetails,
        activeCredits,
        activeCreditDetails,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default statisticController;
