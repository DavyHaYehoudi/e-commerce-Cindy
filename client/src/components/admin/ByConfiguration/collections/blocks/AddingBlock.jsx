import React from "react";
import MainImage from "../../../../../shared/MainImage";

const AddingBlock = ({
  newCollectionName,
  setNewCollectionName,
  handleKeyPress,
  mainImageCreate,
  handleIllustrationCreateChange,
  handleDeleteImage,
  handleAddCollection,
  setMainImageCreate,
}) => {
  return (
    <div className="adding">
      <input
        type="search"
        placeholder="Nouvelle collection"
        className="account-input-config"
        autoFocus
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="main_image-select">
        <MainImage
          mainImage={mainImageCreate}
          handleMainImageChange={handleIllustrationCreateChange}
          handleDeleteImage={handleDeleteImage}
          required={true}
          legend="Illustration"
        />
      </div>
      <button
        className={`account-btn ${
          newCollectionName && mainImageCreate ? "validate-btn" : ""
        }`}
        disabled={newCollectionName === "" || !mainImageCreate}
        onClick={() =>
          handleAddCollection({ mainImageCreate, setMainImageCreate })
        }
      >
        Ajouter
      </button>
    </div>
  );
};

export default AddingBlock;
