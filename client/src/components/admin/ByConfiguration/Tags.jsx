import React from "react";

const Tags = ({
  newTagName,
  setNewTagName,
  handleAddTag,
  handleEditTag,
  tags,
  handleDeleteTag,
}) => {
  return (
    <div>
      <h3>Tags</h3>
      <input
        type="text"
        placeholder="Nouveau tag"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
      />
      <button onClick={handleAddTag}>Add Tag</button>
      <ul>
        {tags?.map((tag) => (
          <li key={tag?.id}>
            {tag?.name}
            <button onClick={() => handleEditTag(tag?.id)}>Edit</button>
            <button onClick={() => handleDeleteTag(tag?.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
