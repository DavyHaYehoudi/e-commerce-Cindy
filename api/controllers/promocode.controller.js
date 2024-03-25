import Promocode from "../models/promocode.model.js";

const promocodeController = {
  getAllPromocode: async (req, res) => {
    try {
      const promocode = await Promocode.find();
      res.status(200).json(promocode);
    } catch (error) {
      console.error("Error getAllPromocodes:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createPromocode: async (req, res) => {
    try {
      const { id, code, percentage, dateExpire } = req.body;
      const promocode = await Promocode.create({
        id,
        code,
        percentage,
        dateExpire,
      });
      res.status(201).json(promocode);
    } catch (error) {
      console.error("Error createPromocode:", error);
      res.status(500).json({ error: error.message });
    }
  },

  deletePromocode: async (req, res) => {
    try {
      const { promocodeId } = req.params;
      const deletePromocode = await Promocode.findOneAndDelete({
        id: promocodeId,
      });

      if (!deletePromocode) {
        return res.status(404).json({ error: "Promocode not found" });
      }

      res.status(204).json();
      // res.status(200).json(deletePromocode);
    } catch (error) {
      console.error("Error deleting promocode:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default promocodeController;
