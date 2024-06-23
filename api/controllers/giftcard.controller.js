import Giftcard from "../models/giftcard.model.js";

const giftcardController = {
  getAllGiftcards: async (req, res) => {
    try {
      const giftcards = await Giftcard.find();
      res.status(200).json(giftcards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createGiftcard: async (req, res) => {
    try {
      const { buyerId, amount } = req.body;
      const giftcard = await Giftcard.create({ buyerId, amount });
      res.status(201).json(giftcard);
    } catch (error) {
      console.error("Error creating giftcard:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  consumerGiftcard: async (req, res) => {
    try {
      const { giftcardId, consumerId } = req.body;
      const giftcard = await Giftcard.findById(giftcardId);
      if (!giftcard || giftcard.consumerId) {
        res.status(404).json("La carte-cadeau n'existe pas.");
        return;
      }
      const consumerGiftcard = await Giftcard.findByIdAndUpdate(
        giftcardId,
        { $set: { consumerId } }, // l'existance de consumerId prouvera que la carte-cardeau a déjà été utilisée.
        { new: true }
      );
      res.status(200).json(consumerGiftcard);
    } catch (error) {
      console.error("Error consuming giftcard:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  verifyGiftcard: async (req, res) => {
    try {
      const { code } = req.query;
      const codeGiftcard = await Giftcard.findOne({ code });
      if (!codeGiftcard) {
        return res
          .status(404)
          .json({ message: "La carte cardeau n'existe pas." });
      }
      const currentDate = new Date();
      if (codeGiftcard?.dateExpire < currentDate) {
        return res
          .status(404)
          .json({ message: "La date de validité a expiré." });
      }
      res.status(200).json({ message: codeGiftcard?.amount });
    } catch (error) {
      console.error("Error verify giftcard:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default giftcardController;
