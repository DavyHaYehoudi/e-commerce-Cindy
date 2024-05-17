import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  categoryToRemove,
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
  const [openModal, setOpenModal] = useState(false);
  const [productsLinkedToCategories, setProductsLinkedToCategories] = useState(
    []
  );
  const categoryId = useSelector((state) => state?.category?.categoryId);
  const productsStore = useSelector((state) => state?.product?.data);
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
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddCategory();
    }
  };
  const handleDeleteCategory = (categoryId) => {
    dispatch(categoryToRemove(categoryId));
    const productsLinkedToCategoriesSearch = productsStore.filter(
      (product) => product.category === categoryId
    );
    if (productsLinkedToCategoriesSearch.length > 0) {
      setProductsLinkedToCategories(productsLinkedToCategoriesSearch);
    }
    setOpenModal(true);
  };
  const handleConfirm = () => {
    console.log("handleConfirm:");
    dispatch(deleteCategory({ categoryId, handleUnauthorized }));
    dispatch(categoryToRemove(""));
    setProductsLinkedToCategories([]);
    setOpenModal(false);
  };
  const handleCancel = () => {
    dispatch(categoryToRemove(""));
    setProductsLinkedToCategories([]);
    setOpenModal(false);
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
  const handleKeyPressEdit = (event) => {
    if (event.key === "Enter") {
      handleEditCategory();
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
  };
};

export default useCategoriesIndex;
