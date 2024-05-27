import React from "react";
import Summary from "./Summary";
import useMasterData from "./hooks/useMasterData";

const Master = () => {
  const {
    collectionName,
    categoriesLinkedToCollection,
    productsLinkedToCollectionAndCategory,
  } = useMasterData();

  return (
    <div className="master">
      <h1>{collectionName}</h1>
      <Summary
        categoriesLinkedToCollection={categoriesLinkedToCollection}
        productsLinkedToCollectionAndCategory={
          productsLinkedToCollectionAndCategory
        }
      />
    </div>
  );
};

export default Master;
