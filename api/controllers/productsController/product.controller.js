import OrderProducts from "../../models/orderProducts.model.js";
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
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Le produit n'existe pas." });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { formData } = req.body;
      // console.log("********** req body :**********", req.body);
      const updateFields = formData;
      // Vérifie si le produit existe
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Le produit n'existe pas." });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateFields,
        { new: true }
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Vérification si le produit existe
      const productExisted = await Product.findById(productId);
      if (!productExisted) {
        return res.status(404).json({ error: "Le produit n'existe pas." });
      }
  
      // Vérification si le produit a déjà été vendu
      const isProductSolded = await OrderProducts.find({ productsId: productId });
      if (isProductSolded.length > 0) {
        // Mettre à jour le champ isArchived
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { isArchived: true },
          { new: true }
        );
        return res.status(200).json(updatedProduct);
      } else {
        // Supprimer le produit
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({ message: "Produit supprimé avec succès." });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
};

export default productController;
