import React from "react";
import CardProduct from "../../shared/CardProduct";
import CartOffcanvas from "../MasterProduct/cartAccess";
import useFilteredProducts from "./hooks/useFilteredProducts";

const Products = ({ updateMaterialCount }) => {
  const productsCurrented = useFilteredProducts(updateMaterialCount);

  return (
    <div className="products">
      {productsCurrented &&
        productsCurrented.map((product) =>
          product?.materials
            .filter((material) => material?.isActive && !material?.isArchived)
            .map((material, i) => (
              <div key={i}>
                <CardProduct product={product} material={material} />
              </div>
            ))
        )}
      <CartOffcanvas />
    </div>
  );
};

export default Products;
