import React from "react";

const Tags = ({ fields, handleChangeFields }) => {
  console.log('fields dans Tags:', fields)
  return (
    <ul className="tags-section">
      {fields &&
        fields?.tags.length > 0 &&
        fields?.tags.map(({ _id, name }) => <li key={_id}>{name}{_id} </li>)}
    </ul>
  );
};

export default Tags;
