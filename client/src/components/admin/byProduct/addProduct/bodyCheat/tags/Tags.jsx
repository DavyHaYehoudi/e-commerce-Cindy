import React from "react";
import Tag from "./Tag";

const Tags = ({ tags, handleRemoveTag }) => {
  return (
    <ul className="tags-section">
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => (
          <Tag
          key={tag?._id}
            tag={tag}
            handleRemoveTag={handleRemoveTag}
          />
        ))}
    </ul>
  );
};

export default Tags;
