import React, { useState } from "react";
import Informations from "./informations";
import MainContent from "./mainContent";
import CartOffcanvas from "./cartAccess";
import Assortments from "./assortments";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const MasterProduct = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });

  return (
    <section id="product-detail-container">
      <MainContent handleCartShow={handleCartShow} />
      <Informations />
      <Assortments />
      <CartOffcanvas 
      show={showCart}
       handleClose={handleCartClose}
        />
    </section>
  );
};

export default MasterProduct;
