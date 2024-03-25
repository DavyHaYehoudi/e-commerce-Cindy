import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../../features/admin/categorySlice";
import AddCategoryForm from "./AddCategoryForm";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState(
    []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const categories = useSelector((state) => state?.category?.data);
  const collections = useSelector((state) => state?.collection?.data);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "" && selectedParentCollections.length > 0) {
      const formatData = {
        name: newCategoryName,
        parentCollection: selectedParentCollections,
      };
      dispatch(addCategory(formatData));
      setNewCategoryName("");
      setSelectedParentCollections([]);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette categorie ?"
    );
    if (confirmation) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleEditCategory = (categoryId, name) => {
    if (editedCategoryName.trim() !== "") {
      dispatch(
        updateCategory({
          categoryId,
          name: editedCategoryName,
          parentCollection: selectedParentCollections,
        })
      );
      resetEditState();
    }
  };

  const handleEditClick = (categoryId, categoryName, parentCollections) => {
    setEditCategoryId(categoryId);
    setEditedCategoryName(categoryName);
    setSelectedParentCollections(parentCollections);
  };

  const handleSaveClick = () => {
    handleEditCategory(editCategoryId, editedCategoryName);
  };

  const resetEditState = () => {
    setEditCategoryId(null);
    setEditedCategoryName("");
    setSelectedParentCollections([]);
  };

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
          />
          <AddCategoryForm
            newCategoryName={newCategoryName}
            selectedParentCollections={selectedParentCollections}
            collections={collections}
            handleAddCategory={handleAddCategory}
            setNewCategoryName={setNewCategoryName}
            setSelectedParentCollections={setSelectedParentCollections}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
