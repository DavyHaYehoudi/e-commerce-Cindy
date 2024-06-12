import React, { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import CategoriesList from "./CategoriesList";
import useCategoriesIndex from "../hooks/useCategoriesIndex";
import Modal from "../shared/Modal";
import Archives from "../shared/Archives";
import ToggleButton from "../../../../../shared/ToggleButton";
import useIllustrationCreate from "../collections/hooks/useIllustrationCreate";

const Categories = () => {
  const [addIllustrationToStorage, setAddIllustrationToStorage] =
  useState(null);
const [removeIllustrationToStorage, setRemoveIllustrationToStorage] =
  useState(null);
  const {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    isContentVisible,
    categoriesStore,
    collectionsStore,
    openModal,
    productsLinkedToCategories,
    productSolded,
    nameModal,
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
    loading
  } = useCategoriesIndex();
  const {
    handleIllustrationCreateChange,
    handleDeleteImage,
    mainImageCreate,
    setMainImageCreate,
  } = useIllustrationCreate();

  return (
    <div className="admin-categories configuration">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Categories</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <div className="archives">
            <ToggleButton
              initialText="Afficher les catégories archivées"
              hiddenText="Fermer les archives"
              buttonClass="account-btn toggle"
              content={
                <Archives store={categoriesStore} parameter={"category"} />
              }
            />
          </div>
          <CategoriesList
            categoriesStore={categoriesStore}
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
            addIllustrationToStorage={addIllustrationToStorage}
            setAddIllustrationToStorage={setAddIllustrationToStorage}
            removeIllustrationToStorage={removeIllustrationToStorage}
            setRemoveIllustrationToStorage={
              setRemoveIllustrationToStorage
            }
          />
          <AddCategoryForm
            newCategoryName={newCategoryName}
            selectedParentCollections={selectedParentCollections}
            collectionsStore={collectionsStore}
            handleAddCategory={handleAddCategory}
            setNewCategoryName={setNewCategoryName}
            setSelectedParentCollections={setSelectedParentCollections}
            handleKeyPress={handleKeyPress}
            mainImageCreate={mainImageCreate}
            handleIllustrationCreateChange={handleIllustrationCreateChange}
            handleDeleteImage={handleDeleteImage}
            setMainImageCreate={setMainImageCreate}
            loading={loading}
          />
        </div>
      )}
      {openModal && (
        <Modal
          productsLinkedToCategories={productsLinkedToCategories}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          productSolded={productSolded}
          name={nameModal}
        />
      )}
    </div>
  );
};

export default Categories;
