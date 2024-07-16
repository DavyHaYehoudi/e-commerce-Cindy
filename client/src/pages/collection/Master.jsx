import React from "react";
import Summary from "./Summary";
import useMasterData from "./hooks/useMasterData";
import CartOffcanvas from "../MasterProduct/cartAccess";

const Master = () => {
  const {
    collectionName,
    categoriesLinkedToCollection,
    productsNumber,
    collectionId,
  } = useMasterData();

  return (
    <div className="collection-master">
      <div className="animated-container">
        <div className="main-title">
          <h1 className="text-effect-1">Collection : {collectionName}</h1>(
          {productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}
        </div>
        <Summary
          categoriesLinkedToCollection={categoriesLinkedToCollection}
          collectionId={collectionId}
        />
      </div>
      <CartOffcanvas />
      <div className="background-collection-master"></div>
    </div>
  );
};

export default Master;
