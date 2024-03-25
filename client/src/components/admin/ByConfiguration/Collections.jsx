import React, { useState } from "react";
import {
  addCollection,
  deleteCollection,
  updateCollection,
} from "../../../features/admin/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Collections = () => {
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
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
    <div className="admin-collections">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>
        Collections
      </h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <ul>
            {collections?.map((collection) => (
              <li key={collection?._id} className="content-block-wrapper">
                {editCollectionId === collection?._id ? (
                  <div className="content-block">
                    <div className="content-block-left">
                      <input
                        type="text"
                        className="account-input-config"
                        value={editedCollectionName}
                        onChange={(e) =>
                          setEditedCollectionName(e.target.value)
                        }
                      />
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
                        onClick={() => setEditCollectionId("")}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="content-block-left">{collection?.name}</div>
                    <div className="content-block-right">
                      <button
                        className="icon-edit account-btn"
                        onClick={() =>
                          handleEditClick(collection?._id, collection?.name)
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="icon-trash account-btn"
                        onClick={() => handleDeleteCollection(collection?._id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="adding">
            <input
              type="text"
              placeholder="Nouvelle collection"
              className="account-input-config"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <button
              className={`account-btn ${
                newCollectionName ? "validate-btn" : ""
              }`}
              disabled={newCollectionName === ""}
              onClick={() => handleAddCollection(newCollectionName)}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
