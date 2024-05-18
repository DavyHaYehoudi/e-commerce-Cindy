import React from "react";

const AddCategoryForm = ({
  newCategoryName,
  selectedParentCollections,
  collectionsStore,
  handleAddCategory,
  setNewCategoryName,
  setSelectedParentCollections,
  handleKeyPress
}) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Nouvelle catégorie"
        className="account-input-config"
        autoFocus
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {newCategoryName && (
        <div className="content-category-checkbox">
          <p className="underline">Parenter à une collection :</p>
          {collectionsStore?.filter(collection=>!collection?.isArchived).map((collection) => (
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
                onKeyDown={handleKeyPress}
              />
              {collection.name}
            </label>
          ))}
        </div>
      )}
      <button
        className={`account-btn ${
          newCategoryName && selectedParentCollections.length > 0
            ? "validate-btn"
            : ""
        }`}
        disabled={
          newCategoryName === "" || selectedParentCollections.length === 0
        }
        onClick={handleAddCategory}
      >
        Ajouter
      </button>
    </div>
  );
};
export default AddCategoryForm;
