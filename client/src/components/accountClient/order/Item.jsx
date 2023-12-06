import React from "react";
import { Link } from "react-router-dom";
import TrackingField from "../../../shared/TrackingField";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../selectors/product";
import { getMaterialProperty } from "../../../helpers/constants/materials";
import { formatPrice } from "../../../helpers/prices";

const Item = ({ products, isReturnProduct }) => {
  const state = useSelector((state) => state.product);

  return (
    <div className="order-items-user-account">
      {products.map((product) => {
        const { name, pricing, image } = getProductProperties(
          product.productId,
          state
        );

        return (
          <div key={name} className="order-item-user-account">
            <div className="order-info">
              <p>Nom du produit : {name}</p>
              <p>Matériau : {getMaterialProperty(product.material).name}</p>
              <p>Quantité : {product.quantity}</p>
              <p>Prix unitaire : {formatPrice(pricing.currentPrice)}</p>
            </div>
            <div
              className="image-container info-tooltip"
              aria-label="Revenir au produit"
            >
              <Link>
                <img
                  src={image}
                  alt={name}
                  style={{ width: "100px", height: "150px" }}
                />
              </Link>
            </div>
            {isReturnProduct && <TrackingField isAdmin={false} />}
          </div>
        );
      })}
    </div>
  );
};

export default Item;
