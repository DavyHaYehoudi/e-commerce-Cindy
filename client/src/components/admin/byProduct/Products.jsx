import React from "react";
import { useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";

const Products = () => {
  const products = useSelector((state) => state?.product?.data);
  return (
    <div className="products">
      {products &&
        products?.map((product) => <ProductsCard product={product} />)}
    </div>
  );
};

export default Products;
