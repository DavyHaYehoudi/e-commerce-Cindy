import Collection from "../models/collection.model.js";

const collectionController = {
  getCollections: async (req, res) => {
    try {
      const collections = await Collection.find();
      res.status(200).json(collections);
    } catch (error) {
      console.error("Error getCollections:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createCollection: async (req, res) => {
    try {
      const { name } = req.body;
      const collection = await Collection.create({ name });
      res.status(201).json(collection);
    } catch (error) {
      console.error("Error createCollection :", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateCollection: async (req, res) => {
    try {
      const { collectionId } = req.params;
      const { name } = req.body;

      const updateCollection = await Collection.findByIdAndUpdate(
        collectionId,
        { name },
        { new: true, runValidators: true }
      );

      if (!updateCollection) {
        return res.status(404).json({ message: "La collection n'existe pas." });
      }

      res.status(200).json(updateCollection);
    } catch (error) {
      console.error("Error updateCollection :", error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteCollection: async (req, res) => {
    try {
      const { collectionId } = req.params;
      const deleteCollection = await Collection.findByIdAndDelete(collectionId);

      if (!deleteCollection) {
        return res.status(404).json({ message: "La collection n'existe pas." });
      }

      res.status(200).json(deleteCollection);
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default collectionController;
