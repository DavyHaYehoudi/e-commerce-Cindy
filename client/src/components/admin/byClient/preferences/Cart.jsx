import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../helpers/utils/prices";
import { getProductProperties } from "../../../../selectors/product";
import { getMaterialProperty } from "../../../../helpers/constants/materials";
import { formatDate } from "../../../../helpers/utils/formatDate";

const Cart = ({ productId, productCart }) => {
  const state = useSelector((state) => state?.product?.data);
  return (
    <div className="cartUserViewAdmin" data-testid={`cart-item-${productId}`}>
      <div>
        <p>
          <span className="dotted">Référence</span> :{" "}
          {getProductProperties(productId, state).reference}
        </p>
        <p>
          <span className="dotted">Nom</span> :{" "}
          {getProductProperties(productId, state)?.name}
        </p>
        {getMaterialProperty(productCart.material)?.name !== null && (
          <p>
            <span className="dotted">Matériau</span> :{" "}
            {getMaterialProperty(productCart.material)?.name}
          </p>
        )}

        <p>
          <span className="dotted">Prix</span> :{" "}
          {formatPrice(
            getProductProperties(productId, state).pricing?.currentPrice
          )}
        </p>
        <p>
          <span className="dotted">Ajouté le</span> :{" "}
          {formatDate(productCart.addDate)}{" "}
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
