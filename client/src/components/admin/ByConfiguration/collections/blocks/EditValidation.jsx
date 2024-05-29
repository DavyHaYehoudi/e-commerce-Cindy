import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const EditValidation = ({
  handleSaveClick,
  setEditCollectionId,
  addIllustrationToStorage,
  removeIllustrationToStorage,
  loading,
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
         {loading ? (
          <div className="loader-config">
            <MoonLoader color="var(--dark)" />
          </div>
        ) : (
          "Enregistrer"
        )}
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
