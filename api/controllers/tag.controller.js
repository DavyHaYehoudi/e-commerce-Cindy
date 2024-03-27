import Tag from "../models/tag.model.js";

const tagController = {
  getTags: async (req, res) => {
    try {
      const tags = await Tag.find();
      res.status(200).json(tags);
    } catch (error) {
      console.error("Error getTags:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createTag: async (req, res) => {
    try {
      const { name } = req.body;
      const tag = await Tag.create({ name });
      res.status(201).json(tag);
    } catch (error) {
      console.error("Error createTag :", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateTag: async (req, res) => {
    try {
      const { tagId } = req.params;
      const { name } = req.body;

      const updateTag = await Tag.findByIdAndUpdate(
        tagId,
        { name },
        { new: true, runValidators: true }
      );

      if (!updateTag) {
        return res.status(404).json({ error: "Tag not found" });
      }

      res.status(200).json(updateTag);
    } catch (error) {
      console.error("Error updateTag :", error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteTag: async (req, res) => {
    try {
      const { tagId } = req.params;
      const deleteTag = await Tag.findByIdAndDelete(tagId);

      if (!deleteTag) {
        return res.status(404).json({ error: "Tag not found" });
      }

      res.status(200).json(deleteTag);
    } catch (error) {
      console.error("Error deleting tag:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default tagController;
