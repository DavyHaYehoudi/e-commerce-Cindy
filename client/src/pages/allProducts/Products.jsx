import React from "react";
import CardProduct from "../../shared/CardProduct";
import CartOffcanvas from "../MasterProduct/cartAccess";
import useFilteredProducts from "./hooks/useFilteredProducts";

const Products = ({ updateMaterialCount }) => {
  const { productsCurrented, filterMaterials } =
    useFilteredProducts(updateMaterialCount);
  return (
    <div className="allProducts-display">
      {productsCurrented &&
        productsCurrented.map((product) =>
          product?.materials.filter(filterMaterials).map((material, i) => (
            <div className="wrapper" key={i}>
              <CardProduct product={product} material={material} />
            </div>
          ))
        )}
      <CartOffcanvas />
    </div>
  );
};

export default Products;
