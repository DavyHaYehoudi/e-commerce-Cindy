import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const CategoryItem = ({
  category,
  editCategoryId,
  setEditCategoryId,
  editedCategoryName,
  selectedParentCollections,
  collections,
  handleEditClick,
  handleDeleteCategory,
  handleSaveClick,
  setEditedCategoryName,
  setSelectedParentCollections,
}) => {
  const parentCollection = (parentCollectionArray) => {
    return parentCollectionArray?.map((pcol) =>
      collections?.find((collection) => collection?._id === pcol)
    );
  };

  return (
    <li key={category?._id} className="content-block-wrapper">
      {editCategoryId === category?._id ? (
        <div className="content-block">
          <div className="content-block-left">
            <div>
              <input
                type="text"
                className="account-input-config"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
              <div className="content-category-checkbox">
                {collections&&collections.length>0&& collections.map((collection) => (
                  <label key={collection?._id}>
                    <input
                      type="checkbox"
                      value={collection?._id}
                      checked={selectedParentCollections.includes(
                        collection?._id
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
                    {collection?.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="content-block-right">
            <button
              className="account-btn validate-btn"
              onClick={handleSaveClick}
            >
              Enregistrer
            </button>
            <button
              className="account-btn icon-trash"
              onClick={() => setEditCategoryId("")}
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p>{category?.name} </p>
            <div className="content-block-left details">
              <p>
                <small>
                  {category?.parentCollection?.length > 1
                    ? "Collections parentes :"
                    : "Collection parente :"}
                </small>{" "}
              </p>
              <ul>
                {parentCollection(category?.parentCollection)?.map(

                  ( item ) => (
                    <small key={item?._id}>
                      <li>{item?.name}</li>
                    </small>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="content-block-right">
            <button
              className="icon-edit account-btn"
              onClick={() =>
                handleEditClick(
                  category?._id,
                  category?.name,
                  category?.parentCollection
                )
              }
            >
              <MdEdit />
            </button>
            <button
              className="icon-trash account-btn"
              onClick={() => handleDeleteCategory(category?._id)}
            >
              <BsTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default CategoryItem;
