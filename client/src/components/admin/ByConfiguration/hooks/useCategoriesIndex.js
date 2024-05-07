import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../../features/admin/categorySlice";

const useCategoriesIndex = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState(
    []
  );
  console.log('selectedParentCollections:', selectedParentCollections)
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const categories = useSelector((state) => state?.category?.data);
  const collections = useSelector((state) => state?.collection?.data);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "" && selectedParentCollections.length > 0) {
      dispatch(
        addCategory({
          name: newCategoryName,
          parentCollection: selectedParentCollections,
        })
      );
      resetState();
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

  const handleEditCategory = () => {
    if (editedCategoryName.trim() !== "") {
      dispatch(
        updateCategory({
          categoryId: editCategoryId,
          name: editedCategoryName,
          parentCollection: selectedParentCollections,
        })
      );
      resetState();
    }
  };

  const handleEditClick = (categoryId, categoryName, parentCollections) => {
    setEditCategoryId(categoryId);
    setEditedCategoryName(categoryName);
    setSelectedParentCollections(parentCollections);
  };

  const handleSaveClick = () => {
    handleEditCategory();
  };

  const resetState = () => {
    setNewCategoryName("");
    setEditCategoryId(null);
    setEditedCategoryName("");
    setSelectedParentCollections([]);
  };

  return {
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
  };
};

export default useCategoriesIndex;
