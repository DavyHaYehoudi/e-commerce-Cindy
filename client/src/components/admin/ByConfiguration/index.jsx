import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Collections from "./Collections";
import Categories from "./Categories";
import Tags from "./Tags";
import { ToastContainer } from "react-toastify";
import {addCollection, deleteCollection} from "../../../features/admin/collectionSlice"

const Configuration = () => {
    const dispatch = useDispatch()
  const collections = useSelector((state) => state?.collection?.data);
  const categories = useSelector((state) => state?.category?.data);
  const tags = useSelector((state) => state?.tag?.data);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");

const handleAddCollection = () => {
    const formatData = {
      name: newCollectionName,
    };
    dispatch(addCollection(formatData))
    setNewCollectionName(""); 
  };
  const handleAddCategory = () => {
    // performOperation("categories", "POST", { name: newCategoryName });
    setNewCategoryName("");
  };
  const handleAddTag = () => {
    // performOperation("tags", "POST", { name: newTagName });
    setNewTagName("");
  };
  const handleEditCollection = (collectionId) => {
    // performOperation(`collections/${collectionId}`, "PUT");
  };
  const handleEditCategory = (categoryId) => {
    // performOperation(`categories/${categoryId}`, "PUT");
  };
  const handleEditTag = (tagId) => {
    // performOperation(`tags/${tagId}`, "PUT");
  };
  const handleDeleteCollection = (collectionId) => {
    dispatch(deleteCollection(collectionId))
  };
  const handleDeleteCategory = (categoryId) => {
    // performOperation(`categories/${categoryId}`, "DELETE");
  };
  const handleDeleteTag = (tagId) => {
    // performOperation(`tags/${tagId}`, "DELETE");
  };

  return (
    <div>
      <h2>Configurations</h2>

      <Collections
        newCollectionName={newCollectionName}
        setNewCollectionName={setNewCollectionName}
        collections={collections}
        handleEditCollection={handleEditCollection}
        handleAddCollection={handleAddCollection}
        handleDeleteCollection={handleDeleteCollection}
      />
      <Categories
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        categories={categories}
        handleDeleteCategory={handleDeleteCategory}
      />

      <Tags
        newTagName={newTagName}
        setNewTagName={setNewTagName}
        handleAddTag={handleAddTag}
        handleEditTag={handleEditTag}
        tags={tags}
        handleDeleteTag={handleDeleteTag}
      />

      <button onClick={() => console.log("Publish changes")}>
        Publish Changes
      </button>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Configuration;
