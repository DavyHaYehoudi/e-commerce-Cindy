import Credit from "../models/credit.model.js";

const creditController = {
  getAllCredits: async (req, res) => {
    try {
      const { orderProductsIds } = req.query;
      const parsedProductsByOrderIds = JSON.parse(orderProductsIds);

      const credits = await Credit.find({
        orderProductsId: { $in: parsedProductsByOrderIds },
      }).exec();

      res.status(200).json(credits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  archiveCredit: async (req, res) => {
    const { orderProductsId } = req.params;

    try {
      const credit = await Credit.findOne({ orderProductsId });
      if (!credit) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      credit.archived = true;
      await credit.save();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default creditController;
