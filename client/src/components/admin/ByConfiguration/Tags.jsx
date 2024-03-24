import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag, deleteTag, updateTag } from "../../../features/admin/tagSlice";

const Tags = () => {
  const [editTagId, setEditTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [newTagName, setNewTagName] = useState("");
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
    <div>
      <h2>Tags</h2>
      <ul>
        {tags?.map((tag) => (
          <li key={tag?._id}>
            {editTagId === tag?._id ? (
              <>
                <input
                  type="text"
                  value={editedTagName}
                  onChange={(e) => setEditedTagName(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ) : (
              <>
                {tag?.name}
                <button
                  onClick={() =>
                    handleEditClick(tag?._id, tag?.name)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteTag(tag?._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New tag"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
      />
      <button onClick={() => handleAddTag(newTagName)}>
        Add tag
      </button>
    </div>
  );
};

export default Tags;
