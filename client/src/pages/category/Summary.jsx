import React from "react";
import CardProduct from "../../shared/CardProduct";
import Slider from "react-slick";
import settings from "../../styles/utils/slider";

const Summary = ({ categoryName ,productsNumber,productsLinked}) => {

  return (
    <div className="category-master-row">
      {productsNumber > 0 && (
        <>
          <div className="category-title">
            <h2>Catégorie : {categoryName}</h2>
            <span className="productsNumber" >({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}</span>
          </div>
          <div className="category-master-row-wrapper">
          <Slider {...settings}>
              {productsLinked &&
                productsLinked.length > 0 &&
                productsLinked.map((product) =>
                  product?.materials
                    .filter(
                      (material) => material?.isActive && !material?.isArchived
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

export default Summary;
