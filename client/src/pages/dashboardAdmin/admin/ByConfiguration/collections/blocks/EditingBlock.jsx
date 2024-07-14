import React from "react";
import MainImageEdit from "../storage/MainImageEdit";
import EditValidation from "./EditValidation";
import Switch from "../../../byProduct/productManagment/bodyCheat/materials/shared/Switch";

const EditingBlock = ({
  editedCollectionName,
  setEditedCollectionName,
  handleKeyPressEdit,
  collection,
  loading,
  handleSaveClick,
  setEditCollectionId,
  addIllustrationToStorage,
  setAddIllustrationToStorage,
  removeIllustrationToStorage,
  setRemoveIllustrationToStorage,
  starStatus,
  handleSwitchChange,
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
          onKeyDown={(e) =>
            handleKeyPressEdit({
              event: e,
              addIllustrationToStorage,
              removeIllustrationToStorage,
              setAddIllustrationToStorage,
              setRemoveIllustrationToStorage,
            })
          }
        />
      </div>
      <div className="switch-collection-btn">
        {starStatus(collection?._id) ? (
          <p className="actived">Collection vedette</p>
        ) : (
          <p>Collection classique</p>
        )}
        <Switch
          checked={starStatus(collection?._id)}
          onChange={handleSwitchChange}
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
        loading={loading}
      />
    </div>
  );
};

export default EditingBlock;
