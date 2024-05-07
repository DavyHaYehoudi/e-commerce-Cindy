import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  deleteCollection,
  updateCollection,
} from "../../../../features/admin/collectionSlice";
import { toast } from "react-toastify";
import ConfirmAction from "../collections/ConfirmAction";

const useCollections = () => {
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const collections = useSelector((state) => state?.collection?.data);
  const error = useSelector((state) => state?.collection.error);
  const status = useSelector((state) => state?.collection.status);
  const dispatch = useDispatch();

  const handleAddCollection = () => {
    if (newCollectionName.trim() !== "") {
      dispatch(addCollection({ name: newCollectionName }));
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
      dispatch(deleteCollection(collectionId));
    }
  };

  const handleEditCollection = (collectionId) => {
    if (editedCollectionName.trim() !== "") {
      dispatch(updateCollection({ collectionId, name: editedCollectionName }));
      setEditCollectionId(null);
      setEditedCollectionName("");
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

  // Afficher le toast de confirmation lorsque l'erreur indique qu'une confirmation est nécessaire
  useEffect(() => {
    if (error && status === 400) {
      toast.info(<ConfirmAction message={error} />, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
      });
    }
  }, [error, status]);

  return {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collections,
    setEditCollectionId,
    setEditedCollectionName,
    setNewCollectionName,
    setIsContentVisible,
    handleAddCollection,
    handleDeleteCollection,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
  };
};

export default useCollections;
