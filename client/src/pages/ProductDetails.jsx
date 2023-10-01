import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductAside from "../components/smarts/ProductAside";
import ProductContent from "../components/smarts/ProductContent";
import ProductAssortments from "../components/smarts/ProductsAssortments";
import CartOffcanvas from "../components/smarts/CartOffcanvas";

const Product = () => {
  let { state } = useLocation();
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  return (
    <section id="product-detail-container">
      <ProductContent state={state} handleCartShow={handleCartShow} />
      <ProductAside />
      <ProductAssortments />
      <CartOffcanvas show={showCart} handleClose={handleCartClose} />
    </section>
  );
};

export default Product;
