import React from "react";
import AddCategoryForm from "./AddCategoryForm";
import CategoriesList from "./CategoriesList";
import useCategoriesIndex from "../hooks/useCategoriesIndex";

const Categories = () => {
  const {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    isContentVisible,
    categories,
    collections,
    setEditCategoryId,
    setEditedCategoryName,
    setNewCategoryName,
    setIsContentVisible,
    setSelectedParentCollections,
    handleAddCategory,
    handleDeleteCategory,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
    handleKeyPressEdit
  } = useCategoriesIndex();

  return (
    <div className="admin-categories">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Categories</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <CategoriesList
            categories={categories}
            editCategoryId={editCategoryId}
            setEditCategoryId={setEditCategoryId}
            editedCategoryName={editedCategoryName}
            selectedParentCollections={selectedParentCollections}
            collections={collections}
            handleEditClick={handleEditClick}
            handleDeleteCategory={handleDeleteCategory}
            handleSaveClick={handleSaveClick}
            setEditedCategoryName={setEditedCategoryName}
            setSelectedParentCollections={setSelectedParentCollections}
            handleKeyPressEdit={handleKeyPressEdit}
          />
          <AddCategoryForm
            newCategoryName={newCategoryName}
            selectedParentCollections={selectedParentCollections}
            collections={collections}
            handleAddCategory={handleAddCategory}
            setNewCategoryName={setNewCategoryName}
            setSelectedParentCollections={setSelectedParentCollections}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
