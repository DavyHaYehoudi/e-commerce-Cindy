import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductProperties } from "../../../../helpers/storeDataUtils";
import { formatPrice } from "../../../../helpers/prices";

const Wishlist = ({ productId, productCart }) => {
  const state = useSelector((state) => state.products);
  return (
    <div className="wishlistUserViewAdmin">
      <div>
        <p>Référence : {getProductProperties(productId, state).reference}</p>
        <p>Nom : {getProductProperties(productId, state).name}</p>
        <p>Matériau : {productCart.material}</p>
        <p>
          Prix : {formatPrice(getProductProperties(productId, state).pricing.currentPrice) }
        </p>
      </div>
      <div className="info-tooltip" aria-label="Revenir à la fiche produit">
        <Link>
          <img
            src={getProductProperties(productId, state).image}
            alt={getProductProperties(productId, state).name}
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
