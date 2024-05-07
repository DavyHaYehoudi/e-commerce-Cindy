import React from "react";
import useCategories from "../hooks/useCategories";

const Categories = () => {
  console.log('avanmt le hook');
  const {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    categories,
    collections,
    setEditedCategoryName,
    setSelectedParentCollections,
    setNewCategoryName,
    handleAddCategory,
    handleDeleteCategory,
    handleEditClick,
    handleSaveClick,
    parentCollection,
  } = useCategories();
console.log('apres le hook');
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
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
                        checked={selectedParentCollections.includes(
                          collection._id
                        )}
                        onChange={(e) => {
                          const checkedCollectionId = e.target.value;
                          setSelectedParentCollections((prevState) =>
                            prevState.includes(checkedCollectionId)
                              ? prevState.filter(
                                  (id) => id !== checkedCollectionId
                                )
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
        ))}
      </ul>
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

export default Categories;
