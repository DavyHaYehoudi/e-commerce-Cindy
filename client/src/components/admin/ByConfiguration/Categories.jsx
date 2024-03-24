import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../features/admin/categorySlice";

const Categories = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const categories = useSelector((state) => state?.category?.data);
  const collections = useSelector((state) => state?.collection?.data);

  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "" && selectedParentCollections.length > 0) {
      const formatData = {
        name: newCategoryName,
        parentCollection: selectedParentCollections,
      };
      dispatch(addCategory(formatData));
      setNewCategoryName("");
      setSelectedParentCollections([]); 
    }
  };
  

  const handleDeleteCategory = (categoryId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette categorie ?"
    );
    if (confirmation) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleEditCategory = (categoryId, name) => {
    if (editedCategoryName.trim() !== "") {
      dispatch(updateCategory({ categoryId, name: editedCategoryName, parentCollection: selectedParentCollections }));
      setEditCategoryId(null);
      setEditedCategoryName("");
      setSelectedParentCollections([]);
    }
  };

  const handleEditClick = (categoryId, categoryName, parentCollections) => {
    setEditCategoryId(categoryId);
    setEditedCategoryName(categoryName);
    setSelectedParentCollections(parentCollections);
  };

  const handleSaveClick = () => {
    handleEditCategory(editCategoryId, editedCategoryName);
  };

  const parentCollection = (parentCollectionArray) => {
    return parentCollectionArray?.map((pcol) =>
      collections?.find((collection) => collection._id === pcol)
    );
  };

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
                        checked={selectedParentCollections.includes(collection._id)}
                        onChange={(e) => {
                          const checkedCollectionId = e.target.value;
                          setSelectedParentCollections(prevState =>
                            prevState.includes(checkedCollectionId)
                              ? prevState.filter(id => id !== checkedCollectionId)
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
                {category?.name} {"(collection parente : " + parentCollection(category?.parentCollection)?.map(item => item?.name).join(", ") + ")"}
                <button onClick={() => handleEditClick(category?._id, category?.name, category?.parentCollection)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category?._id)}>Delete</button>
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
                setSelectedParentCollections(prevState =>
                  prevState.includes(checkedCollectionId)
                    ? prevState.filter(id => id !== checkedCollectionId)
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
