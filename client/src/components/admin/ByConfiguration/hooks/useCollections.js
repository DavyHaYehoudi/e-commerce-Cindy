import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  addCollectionToRemove,
  deleteCollection,
  resetStore,
  updateCollection,
} from "../../../../features/admin/collectionSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useCollections = () => {
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productsLinkedToCollectionId, setProductsLinkedToCollectionId] =
    useState([]);
  const [categoriesLinkedToCollectionId, setCategoriesLinkedToCollectionId] =
    useState([]);
  const [productsLinkedToCategories, setProductsLinkedToCategories] = useState(
    []
  );
  const productsStore = useSelector((state) => state?.product?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const collectionId = useSelector((state) => state?.collection?.collectionId);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleAddCollection = () => {
    if (newCollectionName.trim() !== "") {
      dispatch(addCollection({ newCollectionName, handleUnauthorized }));
      setNewCollectionName("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddCollection();
    }
  };

  const handleDeleteCollection = (collectionId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette collection ?"
    );
    if (confirmation) {
      dispatch(addCollectionToRemove(collectionId));
      const productsLinkedToCollectionIdSearch = productsStore.filter(
        (product) => product._collection === collectionId
      );

      const categoriesLinkedToCollectionIdSearch = categoriesStore.filter(
        (category) =>
          category?.parentCollection.some((item) => item === collectionId)
      );

      const productsLinkedToCategoriesSearch = productsStore.filter((product) =>
        categoriesLinkedToCollectionIdSearch.some(
          (item) => item._id === product.category
        )
      );

      if (productsLinkedToCollectionIdSearch.length > 0) {
        setProductsLinkedToCollectionId(productsLinkedToCollectionIdSearch);
        setOpenModal(true);
      }
      if (categoriesLinkedToCollectionIdSearch.length > 0) {
        setCategoriesLinkedToCollectionId(categoriesLinkedToCollectionIdSearch);
        setOpenModal(true);
      }
      if (productsLinkedToCategoriesSearch.length > 0) {
        setProductsLinkedToCategories(productsLinkedToCategoriesSearch);
      }
    }
  };

  const handleEditCollection = (collectionId) => {
    if (editedCollectionName.trim() !== "") {
      dispatch(
        updateCollection({
          collectionId,
          name: editedCollectionName,
          handleUnauthorized,
        })
      );
      setEditCollectionId(null);
      setEditedCollectionName("");
    }
  };
  const handleKeyPressEdit = (event, collectionId) => {
    if (event.key === "Enter") {
      handleEditCollection(collectionId);
    }
  };

  const handleEditClick = (collectionId, collectionName) => {
    setEditCollectionId(collectionId);
    setEditedCollectionName(collectionName);
  };

  const handleSaveClick = () => {
    if (editedCollectionName.trim() !== "") {
      handleEditCollection(editCollectionId);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    dispatch(resetStore());
  };

  const handleConfirm = () => {
    try {
      dispatch(deleteCollection({ collectionId, handleUnauthorized }));
      dispatch(resetStore());
      setOpenModal(false);
    } catch (error) {
      console.log("error in handleConfirm", error);
    }
  };

  return {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collectionsStore,
    openModal,
    productsLinkedToCollectionId,
    categoriesLinkedToCollectionId,
    productsLinkedToCategories,
    handleCancel,
    handleConfirm,
    setEditCollectionId,
    setEditedCollectionName,
    setNewCollectionName,
    setIsContentVisible,
    handleAddCollection,
    handleDeleteCollection,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
    handleKeyPressEdit,
  };
};

export default useCollections;
