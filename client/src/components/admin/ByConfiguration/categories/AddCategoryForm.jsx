import React from "react";

const AddCategoryForm = ({
  newCategoryName,
  selectedParentCollections,
  collections,
  handleAddCategory,
  setNewCategoryName,
  setSelectedParentCollections,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Nouvelle catégorie"
        className="account-input-config"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      {newCategoryName && (
        <div className="content-category-checkbox">
          <p className="underline">Parenter à une collection :</p>
          {collections?.map((collection) => (
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
