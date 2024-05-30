import React, { useState } from "react";
import ProductAside from "./ProductAside";
import ProductContent from "./ProductContent";
import CartOffcanvas from "./CartOffcanvas";
import ProductsAssortments from "./ProductsAssortments";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const MasterProduct = () => {
  const [showCart, setShowCart] = useState(false);
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  return (
    <section id="product-detail-container">
      <ProductContent handleCartShow={handleCartShow} />
      {/* <ProductAside />
      <ProductsAssortments />
      <CartOffcanvas show={showCart} handleClose={handleCartClose} /> */}
    </section>
  );
};

export default MasterProduct;
