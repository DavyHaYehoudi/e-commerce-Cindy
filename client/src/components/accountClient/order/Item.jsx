import React from "react";
import { Link } from "react-router-dom";
import TrackingField from "../../../shared/TrackingField";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../helpers/storeDataUtils";

const Item = ({ products, isReturnProduct }) => {
  const state = useSelector((state) => state.products);

  return (
    <div className="order-items-user-account">
      {products.map((product) => (
        <div
          key={getProductProperties(product.productId, state).name}
          className="order-item-user-account"
        >
          <div className="order-info">
            <p>
              Nom du produit :{" "}
              {getProductProperties(product.productId, state).name}
            </p>
            <p>Matériau : {product.material}</p>
            <p>Quantité : {product.quantity}</p>
            <p>
              Prix unitaire :{" "}
              {
                getProductProperties(product.productId, state).pricing
                  .currentPrice
              }
            </p>
          </div>
          <div
            className="image-container info-tooltip"
            aria-label="Revenir au produit"
          >
            <Link>
              <img
                src={
                  getProductProperties(product.productId, state).image
                }
                alt={getProductProperties(product.productId, state).name}
                style={{ width: "100px", height: "150px" }}
              />
            </Link>
          </div>
          {isReturnProduct && <TrackingField isAdmin={false} />}
        </div>
      ))}
    </div>
  );
};

export default Item;
