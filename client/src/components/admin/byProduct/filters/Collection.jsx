import React from "react";

const Collection = ({
  collectionSelected,
  setCollectionSelected,
  collections,
}) => {
  const handleCollectionChange = (event) => {
    setCollectionSelected(event.target.value);
  };

  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">PAR COLLECTIONS :</p>
      {collections &&
        collections.map((collection, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`collection_${index}`}
              name="collection"
              value={collection?.name}
              checked={collectionSelected === collection?.name}
              onChange={handleCollectionChange}
            />
            <label htmlFor={`collection_${index}`}>{collection?.name}</label>
          </div>
        ))}
    </div>
  );
};

export default Collection;
