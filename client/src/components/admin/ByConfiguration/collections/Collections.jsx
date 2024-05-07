import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import useCollections from "../hooks/useCollections";
import MainImage from "../../../../shared/MainImage";

const Collections = () => {
  const {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collections,
    setEditCollectionId,
    setEditedCollectionName,
    setNewCollectionName,
    setIsContentVisible,
    handleAddCollection,
    handleDeleteCollection,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
  } = useCollections();
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
                        type="search"
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
                    <div className="content-block-main_image">
                      <MainImage
                        required={true}
                        legend="Image illustrant la collection"
                      />
                    </div>
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
              type="search"
              placeholder="Nouvelle collection"
              className="account-input-config"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="main_image-select">
              <MainImage required={true} legend="Image illustrant la collection" />
            </div>
            <button
              className={`account-btn ${
                newCollectionName ? "validate-btn" : ""
              }`}
              disabled={newCollectionName === ""}
              onClick={handleAddCollection}
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
