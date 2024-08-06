import React from "react";
import CardProduct from "../../shared/CardProduct";
import useProductsLinkedCategory from "./hooks/useProductsLinkedCategory";
import Slider from "react-slick";
import settings from "../../styles/utils/slider";

const SummaryDetails = ({ category, collectionId }) => {
  const { productsLinked, productsNumber } = useProductsLinkedCategory({
    collectionId,
    categoryId: category?._id,
  });

  return (
    <div className="collection-master-row">
      {productsNumber > 0 && (
        <>
          <div className="category-title">
            <h2>Catégorie : {category?.name}</h2>
            <span className="productsNumber" >({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}</span>
          </div>
          <div className="collection-master-row-wrapper">
          <Slider {...settings}>
              {productsLinked &&
                productsLinked.length > 0 &&
                productsLinked.map((product) =>
                  product?.materials
                    .filter(
                      (material) => material.isActive && !material.isArchived
                    )
                    .map((material, i) => (
                      <div key={i}>
                        <CardProduct
                          product={product}
                          material={material}
                        />
                      </div>
                    ))
                )}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryDetails;
