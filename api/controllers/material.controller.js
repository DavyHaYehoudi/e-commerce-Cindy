import Material from "../models/material.model.js";

const materialController = {
  getAllMaterials: async (req, res) => {
    try {
      const materials = await Material.find();
      res.status(200).json(materials);
    } catch (error) {
      console.error("Error getAllMaterials:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createMaterials: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const { name, value } = req.body;
      const material = await Material.create({ name, value });
      res.status(201).json(material);
    } catch (error) {
      console.error("Error createMaterials:", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateMaterials: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const { materialId } = req.params;
      const { name, value } = req.body;

      const updateMaterial = await Material.findByIdAndUpdate(
        materialId,
        { name, value },
        { new: true, runValidators: true }
      );

      if (!updateMaterial) {
        return res.status(404).json({ error: "Le matériau n'existe pas." });
      }

      res.status(200).json(updateMaterial);
    } catch (error) {
      console.error("Error updateMaterials:", error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteMaterial: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const { materialId } = req.params;
      const deleteMaterial = await Material.findByIdAndDelete(materialId);

      if (!deleteMaterial) {
        return res.status(404).json({ error: "Le matériau n'existe pas." });
      }

      res.status(200).json(deleteMaterial);
    } catch (error) {
      console.error("Error deleting material:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default materialController;
