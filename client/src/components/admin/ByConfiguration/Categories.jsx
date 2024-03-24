import React from "react";

const Categories = ({
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
  handleEditCategory,
  categories,
  handleDeleteCategory,
}) => {
  return (
    <div>
      <h3>Categories</h3>
      <input
        type="text"
        placeholder="Nouvelle catégorie"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>
      <ul>
        {categories?.map((category) => (
          <li key={category?.id}>
            {category?.name}
            <button onClick={() => handleEditCategory(category?.id)}>Edit</button>
            <button onClick={() => handleDeleteCategory(category?.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
