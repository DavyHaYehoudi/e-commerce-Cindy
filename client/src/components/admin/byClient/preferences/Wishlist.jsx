import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductProperties } from "../../../../helpers/storeDataUtils";

const Wishlist = ({ productId, productCart }) => {
  const state = useSelector((state) => state);
  return (
    <div className="wishlistUserViewAdmin">
      <div>
        <p>Product ID : {getProductProperties(productId, state).id}</p>
        <p>Name : {getProductProperties(productId, state).name}</p>
        <p>Material : {productCart.material}</p>
        <p>
          Price : {getProductProperties(productId, state).pricing.currentPrice}
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
