import Product from "../../models/product/product.model.js";
import process from "./filter/process.js";
const productController = {
  getAllProducts: async (req, res) => {
    // console.log('dans le controller getAllProducts');
    try {
      let totalProductsCount;
      let products;

      if (Object.keys(req.query).length === 0) {
        totalProductsCount = await Product.countDocuments();
        products = await Product.find().sort({ createdAt: -1 });
      } else { 
        const { processedProducts, processedTotalProductsCount } =
          await process(req.query);
        products = processedProducts;
        totalProductsCount = processedTotalProductsCount;
      }

      res.status(200).json({ products, totalProductsCount });
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
    console.log('dans le controller createProduct');

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
      await Product.findByIdAndDelete(productId);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default productController;