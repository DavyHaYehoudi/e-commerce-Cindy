import React from "react";
import Informations from "./informations";
import MainContent from "./mainContent";
import CartOffcanvas from "./cartAccess";
import Assortments from "./assortments";
import { useLocation, useParams } from "react-router-dom";

const MasterProduct = () => {
  const { productId } = useParams();
  const { state } = useLocation();

  return (
    <section id="master-product">
      <MainContent productId={productId} materialId={state?.materialId} />
      <Informations />
      <Assortments productId={productId} />
      <CartOffcanvas />
    </section>
  );
};

export default MasterProduct;
