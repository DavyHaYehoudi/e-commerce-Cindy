import React from "react";
import MainImage from "../../../../../shared/MainImage";
import MoonLoader from "react-spinners/MoonLoader";

const AddCategoryForm = ({
  newCategoryName,
  selectedParentCollections,
  collectionsStore,
  handleAddCategory,
  setNewCategoryName,
  setSelectedParentCollections,
  handleKeyPress,
  mainImageCreate,
  handleIllustrationCreateChange,
  handleDeleteImage,
  setMainImageCreate,
  loading,
}) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Nouvelle catégorie (50 caractères maximum)"
        className="account-input-config"
        autoFocus
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onKeyDown={(e) =>
          handleKeyPress({ event: e, mainImageCreate, setMainImageCreate })
        }
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
      {newCategoryName && (
        <div className="content-category-checkbox">
          <p className="underline">Parenter à une collection :</p>
          {collectionsStore
            ?.filter((collection) => !collection?.isArchived)
            .map((collection) => (
              <label key={collection._id}>
                <input
                  type="checkbox"
                  value={collection._id}
                  checked={selectedParentCollections.includes(collection._id)}
                  onChange={(e) => {
                    const checkedCollectionId = e.target.value;
                    setSelectedParentCollections((prevState) =>
                      prevState.includes(checkedCollectionId)
                        ? prevState.filter((id) => id !== checkedCollectionId)
                        : [...prevState, checkedCollectionId]
                    );
                  }}
                  onKeyDown={(e) =>
                    handleKeyPress({ event: e, mainImageCreate, setMainImageCreate })
                  }
                />
                {collection.name}
              </label>
            ))}
        </div>
      )}
      <button
        className={`account-btn ${
          newCategoryName &&
          selectedParentCollections.length > 0 &&
          mainImageCreate
            ? "validate-btn"
            : ""
        }`}
        disabled={
          newCategoryName === "" ||
          selectedParentCollections.length === 0 ||
          !mainImageCreate
        }
        onClick={() =>
          handleAddCategory({ mainImageCreate, setMainImageCreate })
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
export default AddCategoryForm;
