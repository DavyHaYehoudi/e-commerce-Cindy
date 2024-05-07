import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmDeleteCollection } from "../../../../features/admin/collectionSlice";
import { updateCategoriesByCollectionId } from "../../../../features/admin/categorySlice";

const ConfirmAction = ({ message }) => {
  const collectionId = useSelector((state) => state?.collection?.collectionId);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(confirmDeleteCollection(collectionId)).then((result) => {
      if (result.payload) {
        dispatch(updateCategoriesByCollectionId(result.payload)); // Dispatch l'action pour mettre à jour le slice category
      }
    });
  };

  const handleCancel = () => {
    // Laissez ce vide car l'utilisateur a annulé l'action
  };

  return (
    <div className="collection-confirm-action">
      <span>{message} </span>
      <span>
       Toute catégorie se retrouvant sans collection apparentée sera supprimée elle aussi.
      </span>
      <span>Voulez-vous vraiment supprimer cette collection ?</span>
      <div className="buttons">
        <button className="confirm-action-button cancel" onClick={handleCancel}>
          Annuler
        </button>
        <button className="confirm-action-button confirm" onClick={handleConfirm}>
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default ConfirmAction;
