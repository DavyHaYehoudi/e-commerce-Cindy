import React from "react";
import { useLocation } from "react-router-dom";
import ProductAside from "../components/smarts/ProductAside";
import ProductContent from "../components/smarts/ProductContent";

const Product = () => {
  let { state } = useLocation();

  return (
    <section id="product-detail-container">
      <ProductContent state={state} />
      <ProductAside />
    </section>
  );
};

export default Product;
