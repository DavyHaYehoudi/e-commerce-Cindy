import React from "react";
import { Link } from "react-router-dom";
// import TrackingField from "../../../shared/TrackingField";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../selectors/product";
import { getMaterialProperty } from "../../../helpers/constants/materials";
import { formatPrice } from "../../../helpers/utils/prices";

const Item = ({ products, isReturnProduct }) => {
  const state = useSelector((state) => state?.product?.data);
  const productsStore = useSelector((state) => state?.client?.data?.products);

  return (
    <div className="order-items-user-account" data-testid="order-items-user-account">
      {products &&
        productsStore &&
        productsStore
          .filter((ps) => products.some((p) => p === ps.productId))
          .map((product) => {
            const { name, pricing, image } = getProductProperties(
              product.productId,
              state
            );
            return (
              <div key={product.productId} className="order-item-user-account">
                <div className="order-info">
                  <p>Nom du produit : {name || "Non disponible"}</p>
                  <p>
                    Matériau :{" "}
                    {name && getMaterialProperty(product?.material).name}
                  </p>
                  <p>Quantité : {product?.quantity}</p>
                  <p>Prix unitaire : {formatPrice(pricing?.currentPrice)}</p>
                </div>
                <div
                  className="image-container info-tooltip"
                  aria-label="Revenir au produit"
                >
                  <Link>
                    <img
                      src={`/photos/${image}`}
                      alt={name || "Non disponible"}
                      style={{ width: "100px", height: "150px" }}
                    />
                  </Link>
                </div>
                {/* {isReturnProduct && <TrackingField isAdmin={false} />} */}
              </div>
            );
          })}
    </div>
  );
};

export default Item;
