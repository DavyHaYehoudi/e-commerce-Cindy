import React from "react";

const CategoryItem = ({
  category,
  editCategoryId,
  editedCategoryName,
  selectedParentCollections,
  collections,
  handleEditClick,
  handleDeleteCategory,
  handleEditCategory,
  handleSaveClick,
  setEditedCategoryName,
  setSelectedParentCollections
}) => {
  const parentCollection = (parentCollectionArray) => {
    return parentCollectionArray?.map((pcol) =>
      collections?.find((collection) => collection._id === pcol)
    );
  };

  return (
    <li key={category?._id}>
      {editCategoryId === category?._id ? (
        <>
          <input
            type="text"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
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
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          {category?.name}{" "}
          {"(collection parente : " +
            parentCollection(category?.parentCollection)
              ?.map((item) => item?.name)
              .join(", ") +
            ")"}
          <button
            onClick={() =>
              handleEditClick(
                category?._id,
                category?.name,
                category?.parentCollection
              )
            }
          >
            Edit
          </button>
          <button onClick={() => handleDeleteCategory(category?._id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default CategoryItem;
