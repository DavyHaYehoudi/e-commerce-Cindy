import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../../features/admin/categorySlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useCategoriesIndex = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState(
    []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const categories = useSelector((state) => state?.category?.data);
  const collections = useSelector((state) => state?.collection?.data);
  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "" && selectedParentCollections.length > 0) {
      dispatch(
        addCategory({
          name: newCategoryName,
          parentCollection: selectedParentCollections,
          handleUnauthorized,
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
      dispatch(deleteCategory({ categoryId, handleUnauthorized }));
    }
  };

  const handleEditCategory = () => {
    if (editedCategoryName.trim() !== "") {
      dispatch(
        updateCategory({
          categoryId: editCategoryId,
          name: editedCategoryName,
          parentCollection: selectedParentCollections,
          handleUnauthorized,
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
