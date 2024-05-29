import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductAside from "./ProductAside";
import ProductContent from "./ProductContent";
import CartOffcanvas from "./CartOffcanvas";
import ProductsAssortments from "./ProductsAssortments";

const MasterProduct = () => {
  let { state } = useLocation();
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  return (
    <section id="product-detail-container">
      <ProductContent state={state} handleCartShow={handleCartShow} />
      <ProductAside />
      <ProductsAssortments />
      <CartOffcanvas show={showCart} handleClose={handleCartClose} />
    </section>
  );
};

export default MasterProduct;
