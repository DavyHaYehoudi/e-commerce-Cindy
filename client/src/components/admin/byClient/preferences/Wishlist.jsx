import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../helpers/utils/prices";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { getProductProperties } from "../../../../selectors/product";
import { getMaterialProperty } from "../../../../helpers/constants/materials";

const Wishlist = ({ productsId, productCart }) => {
  const state = useSelector((state) => state?.product?.data);

  return (
    <div
      className="wishlistUserViewAdmin"
      data-testid={`wishlist-item-${productsId}`}
    >
      <div>
        <p>
          <span className="dotted">Référence</span> :{" "}
          {getProductProperties(productsId, state)?.reference}
        </p>
        <p>
          <span className="dotted">Nom</span> :{" "}
          {getProductProperties(productsId, state)?.name}
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
            getProductProperties(productsId, state)?.pricing?.currentPrice
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
            src={`/photos/${getProductProperties(productsId, state).image}`}
            alt={getProductProperties(productsId, state)?.name}
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
