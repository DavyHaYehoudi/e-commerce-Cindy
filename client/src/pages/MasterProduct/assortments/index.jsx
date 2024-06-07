import React from "react";
import CardProduct from "../../../shared/CardProduct";
import useAssortedProducts from "./hooks/useAssortedProducts";

const Assortments = ({ productId }) => {
  const assortedProducts = useAssortedProducts(productId);

  return (
    <div id="master-product-assortments-section">
      {assortedProducts.length > 0 ? (
        <h2>Vous pourriez aimer aussi</h2>
      ) : (
        <h2>Aucune produit suggéré</h2>
      )}
      <div className="master-product-assortments-container">
        {assortedProducts.length > 0 &&
          assortedProducts.map((product) =>
            product?.materials
              .filter((material) => material.isActive && !material.isArchived)
              .map((material, i) => (
                <CardProduct key={i} product={product} material={material} />
              ))
          )}
      </div>
    </div>
  );
};

export default Assortments;
