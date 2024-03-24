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
        placeholder="New category"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <div>
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
      <button onClick={handleAddCategory}>Add category</button>
    </div>
  );
};
export default AddCategoryForm;
