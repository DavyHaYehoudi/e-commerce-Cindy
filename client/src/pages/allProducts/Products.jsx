import React from "react";
import CardProduct from "../../shared/CardProduct";
import CartOffcanvas from "../MasterProduct/cartAccess";
import useFilteredProducts from "./hooks/useFilteredProducts";
import Slider from "react-slick";
import settings from "../../styles/utils/slider";

const Products = ({ updateMaterialCount }) => {
  const { productsCurrented, filterMaterials } =
    useFilteredProducts(updateMaterialCount);
  return (
    <div className="allProducts">
      <Slider  {...settings}>
      {productsCurrented &&
        productsCurrented.map((product) =>
          product?.materials.filter(filterMaterials).map((material, i) => (
            <div key={i}>
              <CardProduct product={product} material={material} />
            </div>
          ))
        )}
      </Slider>
      <CartOffcanvas />
    </div>
  );
};

export default Products;
