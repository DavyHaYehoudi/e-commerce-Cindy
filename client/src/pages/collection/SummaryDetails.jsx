import React from "react";
import CardProduct from "../../shared/CardProduct";
import useProductsLinkedCategory from "./hooks/useProductsLinkedCategory";

const SummaryDetails = ({ category, collectionId }) => {
  const { productsLinked, productsNumber } = useProductsLinkedCategory({
    collectionId,
    categoryId: category._id,
  });
  return (
    <div className="collection-master-row">
      {productsNumber > 0 && (
        <>
          <div className="title">
            <h2>Catégorie : {category?.name}</h2>
            <small>
              ({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}
            </small>
          </div>
          <div className="collection-master-row-wrapper">
            {productsLinked &&
              productsLinked.length > 0 &&
              productsLinked.map((product) =>
                product?.materials
                  .filter(
                    (material) => material.isActive && !material.isArchived
                  )
                  .map((material,i) => (
                    <CardProduct
                      key={i}
                      product={product}
                      material={material}
                    />
                  ))
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryDetails;
