import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  collectionToRemove,
  deleteCollection,
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
  const [productSolded, setProductSolded] = useState([]);
  const productsStore = useSelector((state) => state?.product?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const collectionId = useSelector((state) => state?.collection?.collectionId);
  const nameModal = collectionsStore.find(
    (collection) => collection._id === collectionId
  )?.name;
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
    dispatch(collectionToRemove(collectionId));
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
      const isProductInOrderProducts = orderProductsStore.filter(
        (orderProduct) =>
          productsLinkedToCollectionIdSearch.some(
            (p) => p._id === orderProduct.productsId
          )
      );
      if (isProductInOrderProducts) {
        setProductSolded(isProductInOrderProducts);
      }
    }
    if (categoriesLinkedToCollectionIdSearch.length > 0) {
      setCategoriesLinkedToCollectionId(categoriesLinkedToCollectionIdSearch);
    }
    if (productsLinkedToCategoriesSearch.length > 0) {
      setProductsLinkedToCategories(productsLinkedToCategoriesSearch);
    }
    setOpenModal(true);
  };

  const handleEditCollection = (collectionId) => {
    if (editedCollectionName.trim() !== "") {
      const formData = { name: editedCollectionName };
      dispatch(
        updateCollection({
          collectionId,
          formData,
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
    dispatch(collectionToRemove(""));
    setProductsLinkedToCollectionId([]);
    setCategoriesLinkedToCollectionId([]);
    setProductsLinkedToCategories([]);
    setProductSolded([]);
  };

  const handleConfirm = () => {
    if (productSolded.length > 0) {
      const formData = { isArchived: true };
      dispatch(
        updateCollection({
          collectionId,
          productSolded,
          formData,
          handleUnauthorized,
        })
      );
    } else {
      dispatch(
        deleteCollection({
          collectionId,
          collectionsStore,
          handleUnauthorized,
        })
      );
    }
    dispatch(collectionToRemove(""));
    setProductsLinkedToCollectionId([]);
    setCategoriesLinkedToCollectionId([]);
    setProductsLinkedToCategories([]);
    setProductSolded([]);
    setOpenModal(false);
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
    productSolded,
    nameModal,
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
