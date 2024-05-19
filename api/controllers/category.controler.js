import Category from "../models/category.model.js";

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error getCategories:", error);
      res.status(500).json({ message: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, parentCollection } = req.body;
      const category = await Category.create({ name, parentCollection });
      res.status(201).json(category);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom de la catégorie doit être unique." });
      } else {
        console.error("Error createCategory:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const updatedFields = req.body;

      const updateCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedFields,
        { new: true, runValidators: true }
      );

      if (!updateCategory) {
        return res.status(404).json({ message: "La catégorie n'existe pas." });
      }

      res.status(200).json(updateCategory);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res
          .status(409)
          .json({ message: "Le nom de la catégorie doit être unique." });
      } else {
        console.error("Error updateCategory:", error);
        res.status(500).json({ message: error.message });
      }
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const deleteCategory = await Category.findByIdAndDelete(categoryId);

      if (!deleteCategory) {
        return res.status(404).json({ message: "La catégorie n'existe pas." });
      }

      res.status(200).json(deleteCategory);
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default categoryController;
