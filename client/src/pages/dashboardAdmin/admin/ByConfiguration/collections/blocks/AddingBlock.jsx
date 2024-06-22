import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import MainImage from "../../../../../../shared/MainImage";
import Switch from "../../../byProduct/productManagment/bodyCheat/materials/shared/Switch";

const AddingBlock = ({
  newCollectionName,
  setNewCollectionName,
  handleKeyPress,
  mainImageCreate,
  handleIllustrationCreateChange,
  handleDeleteImage,
  handleAddCollection,
  setMainImageCreate,
  loading,
  handleSwitchChange,
  isStar,
}) => {
  return (
    <div className="adding">
      <input
        type="search"
        placeholder="Nouvelle collection (50 caractères maximum)"
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
      <div className="switch-collection-btn">
        {isStar ? (
          <p className="actived">Parution vedette</p>
        ) : (
          <p>Parution classique</p>
        )}
        <Switch checked={isStar} onChange={handleSwitchChange} />
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
        {loading ? (
          <div className="loader-config">
            <MoonLoader color="var(--dark)" />
          </div>
        ) : (
          "Ajouter"
        )}
      </button>
    </div>
  );
};

export default AddingBlock;
