import React, { useState } from "react";
import Informations from "./informations";
import MainContent from "./mainContent";
import CartOffcanvas from "./cartAccess";
import Assortments from "./assortments";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";
import { useLocation, useParams } from "react-router-dom";

const MasterProduct = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });
  const { productId } = useParams();
  const { state } = useLocation();
  return (
    <section id="master-product">
      <MainContent
        productId={productId}
        materialId={state?.materialId}
        handleCartShow={handleCartShow}
      />
      <Informations />
      <Assortments productId={productId} />
      <CartOffcanvas show={showCart} handleClose={handleCartClose} />
    </section>
  );
};

export default MasterProduct;
