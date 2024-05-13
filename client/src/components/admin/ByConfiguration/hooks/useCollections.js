import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  confirmDeleteCollection,
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
  const collections = useSelector((state) => state?.collection?.data);
  const alert = useSelector((state) => state?.collection.alert);
  const collectionId = useSelector((state) => state?.collection?.collectionId);
  const categoriesName = useSelector(
    (state) => state?.collection?.categoriesName
  );
  const productsName = useSelector((state) => state?.collection?.productsName);

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
      dispatch(deleteCollection({ collectionId, handleUnauthorized }));
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

  useEffect(() => {
    if (alert) {
      setOpenModal(true);
    }
  }, [alert]);
  const handleCancel = () => {
    setOpenModal(false);
    dispatch(resetStore());
  };

  const handleConfirm = () => {
    try {
      dispatch(confirmDeleteCollection({ collectionId, handleUnauthorized }));
      dispatch(resetStore());
      setOpenModal(false);
    } catch (error) {
      console.log("error in ConfimAction", error);
    }
  };

  return {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collections,
    alert,
    categoriesName,
    productsName,
    openModal,
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
