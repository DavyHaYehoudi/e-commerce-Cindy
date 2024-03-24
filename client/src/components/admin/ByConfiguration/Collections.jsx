import React from "react";

const Collections = ({
  newCollectionName,
  setNewCollectionName,
  collections,
  handleAddCollection,
  handleEditCollection,
  handleDeleteCollection,
}) => {
  return (
    <div>
      <h3>Collections</h3>
      <input
        type="text"
        placeholder="Nouvelle collection"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <button onClick={handleAddCollection}>Add Collection</button>
      <ul>
        {collections?.map((collection) => (
          <li key={collection?._id}>
            {collection?.name}
            <button onClick={() => handleEditCollection(collection?._id)}>Edit</button>
            <button onClick={() => handleDeleteCollection(collection?._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
