import Promocode from "../models/promocode.model.js";

const promocodeController = {
  getAllPromocode: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const promocode = await Promocode.find();
      res.status(200).json(promocode);
    } catch (error) {
      console.error("Error getAllPromocodes:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createPromocode: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
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
      res.status(500).json({ error: error.message });
    }
  },

  deletePromocode: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const { promocodeId } = req.params;
      const deletePromocode = await Promocode.findByIdAndDelete(promocodeId);

      if (!deletePromocode) {
        return res.status(404).json({ error: "Promocode not found" });
      }

      res.status(200).json(promocodeId);
    } catch (error) {
      console.error("Error deleting promocode:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default promocodeController;
