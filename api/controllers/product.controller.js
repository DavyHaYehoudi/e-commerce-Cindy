import Product from "../models/product/product.model.js";
const productController = {
  getAllProduct: async (req, res) => {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const updateFields = req.body;

      // Liste blanche des champs autorisés à être modifiés
      const allowedFields = [
        "name",
        "_collection",
        "category",
        "tags",
        "secondary_images",
        "main_description",
        "materials",
        "noMaterials",
      ];

      // Vérifie si le produit existe
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Mettre à jour les champs autorisés selon les données fournies dans req.body
      for (const key in updateFields) {
        if (allowedFields.includes(key)) {
          existingProduct[key] = updateFields[key];
        }
      }

      // Enregistrer les modifications
      const updatedProduct = await existingProduct.save();

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default productController;
