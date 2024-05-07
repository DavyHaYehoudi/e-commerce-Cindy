import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmDeleteCollection } from "../../../../features/admin/collectionSlice";

const ConfirmAction = ({ message }) => {
    const collectionId = useSelector(state=>state?.collection?.collectionId)
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(confirmDeleteCollection(collectionId));
  };

  const handleCancel = () => {
    // Laissez ce vide car l'utilisateur a annulé l'action
  };

  return (
    <div className="collection-confirm-action">
      <span>{message} </span>
      <span>Voulez-vous vraiment supprimer cette collection ?</span>
      <button className="confirm-action-button" onClick={handleConfirm}>
        Confirmer
      </button>
      <button className="confirm-action-button" onClick={handleCancel}>
        Annuler
      </button>
    </div>
  );
};

export default ConfirmAction;
