import React from "react";
import MainImageEdit from "../storage/MainImageEdit";
import EditValidation from "./EditValidation";

const EditingBlock = ({
  editedCollectionName,
  setEditedCollectionName,
  handleKeyPressEdit,
  collection,
  handleSaveClick,
  setEditCollectionId,
  addIllustrationToStorage,
  setAddIllustrationToStorage,
  removeIllustrationToStorage,
  setRemoveIllustrationToStorage,
}) => {
  return (
    <div className="content-block">
      <div className="content-block-left">
        <input
          type="search"
          className="account-input-config"
          value={editedCollectionName}
          autoFocus
          onChange={(e) => setEditedCollectionName(e.target.value)}
          onKeyDown={(e) => handleKeyPressEdit(e, collection?._id)}
        />
      </div>
      <div className="content-block-main_image">
        <MainImageEdit
          required={true}
          editable={true}
          collectionId={collection?._id}
          legend="Illustration"
          setAddIllustrationToStorage={setAddIllustrationToStorage}
          setRemoveIllustrationToStorage={setRemoveIllustrationToStorage}
        />
      </div>
      <EditValidation
        handleSaveClick={handleSaveClick}
        setEditCollectionId={setEditCollectionId}
        collectionId={collection?._id}
        addIllustrationToStorage={addIllustrationToStorage}
        removeIllustrationToStorage={removeIllustrationToStorage}
        setAddIllustrationToStorage={setAddIllustrationToStorage}
          setRemoveIllustrationToStorage={setRemoveIllustrationToStorage}
      />
    </div>
  );
};

export default EditingBlock;
