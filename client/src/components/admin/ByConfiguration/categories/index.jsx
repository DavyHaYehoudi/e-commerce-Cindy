import React from "react";
import AddCategoryForm from "./AddCategoryForm";
import CategoriesList from "./CategoriesList";
import useCategoriesIndex from "../hooks/useCategoriesIndex";
import Modal from "../shared/Modal";

const Categories = () => {
  const {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    isContentVisible,
    categories,
    collectionsStore,
    openModal,
    productsLinkedToCategories,
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
    handleKeyPressEdit,
    handleCancel,
    handleConfirm,
  } = useCategoriesIndex();

  return (
    <div className="admin-categories configuration">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Categories</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <CategoriesList
            categories={categories}
            editCategoryId={editCategoryId}
            setEditCategoryId={setEditCategoryId}
            editedCategoryName={editedCategoryName}
            selectedParentCollections={selectedParentCollections}
            collectionsStore={collectionsStore}
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
            collectionsStore={collectionsStore}
            handleAddCategory={handleAddCategory}
            setNewCategoryName={setNewCategoryName}
            setSelectedParentCollections={setSelectedParentCollections}
            handleKeyPress={handleKeyPress}
          />
        </div>
      )}
      {openModal && (
        <Modal
          productsLinkedToCategories={productsLinkedToCategories}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Categories;
