import React from "react";
import CardProduct from "../../../shared/CardProduct";
import useAssortedProducts from "./hooks/useAssortedProducts";
import Slider from "react-slick";

const Assortments = ({ productId }) => {
  const assortedProducts = useAssortedProducts(productId);
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
  };
  return (
    <div id="master-product-assortments-section">
      {assortedProducts.length > 0 ? (
        <h2 className="text-effect-1" >Vous pourriez aimer aussi</h2>
      ) : (
        <h2>Aucun produit suggéré</h2>
      )}
      <div className="master-product-assortments-container">
        <Slider {...settings}>
          {assortedProducts.length > 0 &&
            assortedProducts.map((product) =>
              product?.materials
                .filter((material) => material.isActive && !material.isArchived)
                .map((material, i) => (
                  <CardProduct key={i} product={product} material={material} />
                ))
            )}
        </Slider>
      </div>
    </div>
  );
};

export default Assortments;
