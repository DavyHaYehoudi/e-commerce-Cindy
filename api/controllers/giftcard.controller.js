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
      const consumerGiftcard = await Giftcard.findByIdAndUpdate(
        giftcardId,
        { $set: { consumerId } },
        { new: true }
      );
      res.status(200).json(consumerGiftcard); 
    } catch (error) {
      console.error("Error consuming giftcard:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
 
export default giftcardController;
