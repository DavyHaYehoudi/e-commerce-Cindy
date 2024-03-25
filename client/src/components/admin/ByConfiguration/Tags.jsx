import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, deleteTag, updateTag } from "../../../features/admin/tagSlice";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Tags = () => {
  const [editTagId, setEditTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const tags = useSelector((state) => state?.tag?.data);

  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTagName.trim() !== "") {
      const formatData = {
        name: newTagName,
      };
      dispatch(addTag(formatData));
      setNewTagName("");
    }
  };
  const handleDeleteTag = (tagId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet tag ?"
    );
    if (confirmation) {
      dispatch(deleteTag(tagId));
    }
  };
  const handleEditTag = (tagId, name) => {
    dispatch(updateTag({ tagId, name }));
  };
  const handleEditClick = (tagId, tagName) => {
    setEditTagId(tagId);
    setEditedTagName(tagName);
  };

  const handleSaveClick = () => {
    if (editedTagName.trim() !== "") {
      handleEditTag(editTagId, editedTagName);
      setEditTagId(null);
      setEditedTagName("");
    }
  };

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
                        type="text"
                        className="account-input-config"
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
              type="text"
              placeholder="Nouveau tag"
              className="account-input-config"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
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
