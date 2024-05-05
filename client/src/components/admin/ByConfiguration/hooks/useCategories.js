import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../../features/admin/categorySlice";

const useCategories = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState(
    []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
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
      setEditCategoryId(null);
      setEditedCategoryName("");
      setSelectedParentCollections([]);
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

  const parentCollection = (parentCollectionArray) => {
    return parentCollectionArray?.map((pcol) =>
      collections?.find((collection) => collection._id === pcol)
    );
  };

  return {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    categories,
    collections,
    setEditedCategoryName,
    setSelectedParentCollections,
    setNewCategoryName,
    handleAddCategory,
    handleDeleteCategory,
    handleEditClick,
    handleSaveClick,
    parentCollection,
  };
};

export default useCategories;
