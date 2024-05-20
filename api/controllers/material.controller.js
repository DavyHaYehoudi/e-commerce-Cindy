import Material from "../models/material.model.js";
import Product from "../models/product/product.model.js";

const materialController = {
  getAllMaterials: async (req, res) => {
    try {
      const materials = await Material.find();
      res.status(200).json(materials);
    } catch (error) {
      console.error("Error getAllMaterials:", error);
      res.status(500).json({ message: error.message });
    }
  },
  createMaterials: async (req, res) => {
    try {
      const { name, value } = req.body;
      const material = await Material.create({ name, value });
      res.status(201).json(material);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom du matériau doit être unique." });
      } else {
        console.error("Error createMaterials:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },
  updateMaterials: async (req, res) => {
    try {
      const { materialId } = req.params;
      const updatedFields = req.body;

      const updateMaterial = await Material.findByIdAndUpdate(
        materialId,
        updatedFields,
        { new: true, runValidators: true }
      );

      if (!updateMaterial) {
        return res.status(404).json({ message: "Le matériau n'existe pas." });
      }

      res.status(200).json(updateMaterial);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom du matériau doit être unique." });
      } else {
        console.error("Error updateMaterials:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },

  deleteMaterial: async (req, res) => {
    try {
      const { materialId } = req.params;
      const deleteMaterial = await Material.findByIdAndDelete(materialId);

      if (!deleteMaterial) {
        return res.status(404).json({ message: "Le matériau n'existe pas." });
      }
      // Mettre à jour les produits pour supprimer le matériau de leur liste de matériaux
      await Product.updateMany(
        { "materials._id": materialId },
        { $pull: { materials: { _id: materialId } } }
      );

      res.status(200).json(deleteMaterial);
    } catch (error) {
      console.error("Error deleting material:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default materialController;
