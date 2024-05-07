import Category from "../models/category.model.js";
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
      // Vérifier s'il existe des catégories liées à cette collection
      const categories = await Category.find({
        parentCollection: collectionId,
      });
      if (categories.length > 0) {
        const categoryCount = categories.length;
        const message =
          categoryCount > 1
            ? `${categoryCount} catégories sont liées à cette collection.`
            : `Une catégorie est liée à cette collection.`;

        return res
          .status(400)
          .json({ message: { messageError: message, collectionId } });
      }

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
  confirmDeleteCollection: async (req, res) => {
    try {
      const { collectionId } = req.params;
      console.log("collectionId:", collectionId);
      // Supprimer la collection de toutes les catégories liées
      await Category.updateMany(
        { parentCollection: collectionId },
        { $pull: { parentCollection: collectionId } }
      );
      // Vérifier si les catégories associées sont vides après la suppression
      const emptyCategories = await Category.find({
        parentCollection: { $size: 0 },
      });
      if (emptyCategories.length > 0) {
        // Si des catégories sont devenues vides, supprimer les documents correspondants
        await Category.deleteMany({
          _id: { $in: emptyCategories.map((category) => category._id) },
        });
      }
      const deleteCollection = await Collection.findByIdAndDelete(collectionId);
      if (!deleteCollection) {
        return res.status(404).json({ message: "La collection n'existe pas." });
      }
      res
        .status(200)
        .json({ message: "La collection a été supprimée avec succès." });
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }, 
};

export default collectionController;
