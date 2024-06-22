import React from "react";
import Summary from "./Summary";
import useMasterData from "./hooks/useMasterData";
import CartOffcanvas from "../MasterProduct/cartAccess";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";

const Master = () => {
  const {
    categoryName,
    productsLinkedToCategory,
    productsNumber,
    imageCategory,
  } = useMasterData();

  const { imageUrl } = useFirebaseImage(imageCategory);
  return (
    <div className="category-master">
      <div className="animated-container">
        <div className="main-title">
          <h1 className="text-effect-1">Catégorie : {categoryName}</h1>(
          {productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}
        </div>
        <Summary
          categoryName={categoryName}
          productsLinked={productsLinkedToCategory}
          productsNumber={productsNumber}
        />
      </div>
      <CartOffcanvas />
      <div
        className="background-category-master"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Master;
