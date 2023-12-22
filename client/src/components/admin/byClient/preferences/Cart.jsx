import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../helpers/utils/prices";
import { getProductProperties } from "../../../../selectors/product";
import { getMaterialProperty } from "../../../../helpers/constants/materials";

const Cart = ({ productId, productCart }) => {
  const state = useSelector((state) => state?.product?.data);
  return (
    <div className="cartUserViewAdmin">
      <div>
        <p>Référence : {getProductProperties(productId, state).reference}</p>
        <p>Nom : {getProductProperties(productId, state).name}</p>
        <p>Matériau : {getMaterialProperty(productCart.material).name }</p>
        <p>
          Prix : {formatPrice(getProductProperties(productId, state).pricing.currentPrice) }
        </p>
      </div>
      <div className="info-tooltip" aria-label="Revenir à la fiche produit">
        <Link>
          <img
            src={`/photos/${getProductProperties(productId, state).image}`}
            alt={getProductProperties(productId, state).name}
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
