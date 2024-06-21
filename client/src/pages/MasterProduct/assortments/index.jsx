import React from "react";
import CardProduct from "../../../shared/CardProduct";
import useAssortedProducts from "./hooks/useAssortedProducts";
import Slider from "react-slick";
import settings from "../../../styles/utils/slider";

const Assortments = ({ productId }) => {
  const assortedProducts = useAssortedProducts(productId);
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
