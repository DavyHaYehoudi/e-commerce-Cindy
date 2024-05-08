import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import useTags from "../hooks/useTags";

const Tags = () => {
  const {
    editTagId,
    editedTagName,
    newTagName,
    isContentVisible,
    tags,
    setEditTagId,
    setEditedTagName,
    setNewTagName,
    setIsContentVisible,
    handleAddTag,
    handleKeyPress,
    handleDeleteTag,
    handleEditClick,
    handleSaveClick,
  } = useTags();
  return (
    <div className="admin-tags">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Tags</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <ul>
            {tags?.map((tag) => (
              <li key={tag?._id} className="content-block-wrapper">
                {editTagId === tag?._id ? (
                  <div className="content-block">
                    <div className="content-block-left">
                      <input
                        type="search"
                        className="account-input-config"
                        autoFocus
                        value={editedTagName}
                        onChange={(e) => setEditedTagName(e.target.value)}
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
                        onClick={() => setEditTagId("")}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="content-block-left">{tag?.name}</div>
                    <div className="content-block-right">
                      <button
                        className="icon-edit account-btn"
                        onClick={() => handleEditClick(tag?._id, tag?.name)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="icon-trash account-btn"
                        onClick={() => handleDeleteTag(tag?._id)}
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
              placeholder="Nouveau tag"
              className="account-input-config"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className={`account-btn ${newTagName ? "validate-btn" : ""}`}
              disabled={newTagName === ""}
              onClick={() => handleAddTag(newTagName)}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
