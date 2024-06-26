import Promocode from "../models/promocode.model.js";

const promocodeController = {
  getAllPromocode: async (req, res) => {
    try {
      const promocode = await Promocode.find();
      res.status(200).json(promocode);
    } catch (error) {
      console.error("Error getAllPromocodes:", error);
      res.status(500).json({ message: error.message });
    }
  },
  createPromocode: async (req, res) => {
    try {
      const { code, percentage, dateExpire } = req.body;
      const promocode = await Promocode.create({
        code,
        percentage,
        dateExpire,
      });
      res.status(201).json(promocode);
    } catch (error) {
      console.error("Error createPromocode:", error);
      res.status(500).json({ message: error.message });
    }
  },

  deletePromocode: async (req, res) => {
    try {
      const { promocodeId } = req.params;
      const deletePromocode = await Promocode.findByIdAndDelete(promocodeId);

      if (!deletePromocode) {
        return res.status(404).json({ message: "Le code promo n'existe pas." });
      }

      res.status(200).json(promocodeId);
    } catch (error) {
      console.error("Error deleting promocode:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  verifyPromocode: async (req, res) => {
    try {
      const { code } = req.query;
      const codePromo = await Promocode.findOne({ code });
      if (!codePromo) {
        return res.status(404).json({ message: "Le code promo n'existe pas." });
      }
      if (codePromo?.dateExpire < new Date()) {
        return res
          .status(404)
          .json({ message: "La date de validité a expiré." });
      }
      res.status(200).json({ percentage: codePromo?.percentage });
    } catch (error) {
      console.error("Error verify promocode:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default promocodeController;
