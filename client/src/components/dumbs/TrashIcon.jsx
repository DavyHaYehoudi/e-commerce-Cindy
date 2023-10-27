import React from "react";
import { BsTrash } from "react-icons/bs";

const TrashIcon = ({ addClass }) => {
  return (
    <div
      className={`trashIcon info-tooltip ${addClass} `}
      aria-label="Supprimer l'article"
    >
      <BsTrash aria-hidden="true" />
    </div>
  );
};

export default TrashIcon;
