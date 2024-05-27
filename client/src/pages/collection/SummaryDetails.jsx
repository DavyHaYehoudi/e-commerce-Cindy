import React from "react";
import CardProduct from "./CardProduct";

const SummaryDetails = ({
  category,
  productsLinkedToCollectionAndCategory,
}) => {
  return (
    <div>
      <h2>{category?.name}</h2>
      {productsLinkedToCollectionAndCategory &&
        productsLinkedToCollectionAndCategory.length > 0 &&
        productsLinkedToCollectionAndCategory.map((product) =>
          product?.materials.map((material) => (
            <CardProduct
              key={material?._id}
              product={product}
              material={material}
            />
          ))
        )}
    </div>
  );
};

export default SummaryDetails;
