import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Tag = ({ tag, handleRemoveTag }) => {
  return (
    <li className="tag">
      <span key={tag?._id}>{tag?.name} </span>
      <span className="tag-remove" onClick={() => handleRemoveTag(tag?._id)}>
        <AiOutlineClose />{" "}
      </span>
    </li>
  );
};

export default Tag;
