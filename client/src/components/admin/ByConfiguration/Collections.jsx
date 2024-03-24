import React, { useState } from "react";
import {
  addCollection,
  deleteCollection,
  updateCollection,
} from "../../../features/admin/collectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Collections = () => {
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const collections = useSelector((state) => state?.collection?.data);

  const dispatch = useDispatch();

  const handleAddCollection = () => {
    if (newCollectionName.trim() !== "") {
      const formatData = {
        name: newCollectionName,
      };
      dispatch(addCollection(formatData));
      setNewCollectionName("");
    }
  };
  const handleDeleteCollection = (collectionId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette collection ?"
    );
    if (confirmation) {
      dispatch(deleteCollection(collectionId));
    }
  };
  const handleEditCollection = (collectionId, name) => {
    dispatch(updateCollection({ collectionId, name }));
  };
  const handleEditClick = (collectionId, collectionName) => {
    setEditCollectionId(collectionId);
    setEditedCollectionName(collectionName);
  };

  const handleSaveClick = () => {
    if (editedCollectionName.trim() !== "") {
      handleEditCollection(editCollectionId, editedCollectionName);
      setEditCollectionId(null);
      setEditedCollectionName("");
    }
  };

  return (
    <div>
      <h2>Collections</h2>
      <ul>
        {collections?.map((collection) => (
          <li key={collection?._id}>
            {editCollectionId === collection?._id ? (
              <>
                <input
                  type="text"
                  value={editedCollectionName}
                  onChange={(e) => setEditedCollectionName(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ) : (
              <>
                {collection?.name}
                <button
                  onClick={() =>
                    handleEditClick(collection?._id, collection?.name)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteCollection(collection?._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New collection"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <button onClick={() => handleAddCollection(newCollectionName)}>
        Add Collection
      </button>
    </div>
  );
};

export default Collections;
