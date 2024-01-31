import Credit from "../models/credit.model.js";
const creditController = {
  getAllCredits: async (req, res) => {
    try {
      const credit = await Credit.find();
      res.status(200).json(credit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCredit: async (req, res) => {
    try {
      const { productsByOrderId, amount, dateExpire } = req.body;

      if (!productsByOrderId || !amount || !dateExpire) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newCredit = await Credit.create({
        productsByOrderId,
        amount,
        dateExpire,
      });

      res.status(201).json(newCredit);
    } catch (error) {
      console.error("Error creating credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteCredit: async (req, res) => {
    const {productsByOrderId}= req.params
    try {
      const credit = await Credit.findOne({ productsByOrderId: productsByOrderId });

      if (!credit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
      await Credit.findOneAndDelete({ productsByOrderId:  productsByOrderId });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting credit:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default creditController;
