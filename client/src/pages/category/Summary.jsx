import React from "react";
import CardProduct from "../../shared/CardProduct";
import Slider from "react-slick";

const Summary = ({ categoryName ,productsNumber,productsLinked}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="category-master-row">
      {productsNumber > 0 && (
        <>
          <div className="category-title">
            <h2 className="text-effect-1" >Catégorie : {categoryName}</h2>
            <span className="productsNumber" >({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}</span>
          </div>
          <div className="category-master-row-wrapper">
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

export default Summary;
