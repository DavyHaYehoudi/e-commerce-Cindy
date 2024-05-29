import React from "react";
import MainImageDisplay from "../storage/MainImageDisplay";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

const DisplayBlock = ({
  collection,
  collectionsStore,
  handleEditClick,
  handleDeleteCollection,
}) => {
  return (
    <>
      <div className="content-block-left">{collection?.name}</div>
      <div className="content-block-main_image">
        <MainImageDisplay
          collectionId={collection?._id}
          collectionsStore={collectionsStore}
        />
      </div>
      <div className="content-block-right">
        <button
          className="icon-edit account-btn"
          onClick={() => handleEditClick(collection?._id, collection?.name)}
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
  );
};

export default DisplayBlock;
