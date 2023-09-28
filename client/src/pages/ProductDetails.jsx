import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  let { state } = useLocation();
  console.log("state :", state);
  return (
    <div>
      <h2>Détails de l'image (ID : {id})</h2>
      <div>
        <p>Titre: {state.product.item.title}</p>
      </div>
    </div>
  );
};

export default Product;
