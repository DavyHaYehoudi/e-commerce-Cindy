import Category from "../models/category.model.js";
import Collection from "../models/collection.model.js";
import OrderProducts from "../models/orderProducts.model.js";
import Product from "../models/product/product.model.js";

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
      const fields = req.body;
      const collection = await Collection.create(fields);
      res.status(201).json(collection);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom de la collection doit être unique." });
      } else {
        console.error("Error createCollection:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },
  updateCollection: async (req, res) => {
    try { 
      const { collectionId } = req.params;
      const updatedFields = req.body;

      const updateCollection = await Collection.findByIdAndUpdate(
        collectionId,
        updatedFields, 
        { new: true, runValidators: true }
      );
 
      if (!updateCollection) {
        return res.status(404).json({ message: "La collection n'existe pas." });
      }

      res.status(200).json(updateCollection);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom de la collection doit être unique." });
      } else {
        console.error("Error updateCollection:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },  

  deleteCollection: async (req, res) => {
    try {
      const { collectionId } = req.params;
      const products = await Product.find({ _collection: collectionId });
      const orderProducts = await OrderProducts.findOne({
        productsId: { $in: products.map((product) => product._id) },
      });

      if (products.length === 0 || !orderProducts) {
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
        // Supprimer la collection elle-même
        await Collection.findByIdAndDelete(collectionId);

        res.status(200).json({ collectionId });
      } 
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default collectionController;
    