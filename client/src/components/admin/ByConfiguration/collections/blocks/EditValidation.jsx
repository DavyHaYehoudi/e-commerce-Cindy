import React from "react";

const EditValidation = ({
  handleSaveClick,
  setEditCollectionId,
  addIllustrationToStorage,
  removeIllustrationToStorage,
  setAddIllustrationToStorage,
  setRemoveIllustrationToStorage,
}) => {
  return (
    <div className="content-block-right">
      <button
        className="account-btn validate-btn"
        onClick={() =>
          handleSaveClick({
            addIllustrationToStorage,
            removeIllustrationToStorage,
            setAddIllustrationToStorage,
            setRemoveIllustrationToStorage,
          })
        }
      >
        Enregistrer
      </button>
      <button
        className="account-btn icon-trash"
        onClick={() => setEditCollectionId("")}
      >
        Annuler
      </button>
    </div>
  );
};

export default EditValidation;
