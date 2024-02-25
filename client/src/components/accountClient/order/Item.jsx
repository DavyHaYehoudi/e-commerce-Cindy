import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../selectors/product";
import { getMaterialProperty } from "../../../helpers/constants/materials";
import { formatPrice } from "../../../helpers/utils/prices";

const Item = ({ orderProducts }) => {
  const state = useSelector((state) => state?.product?.data);
  const orderProductsStore = useSelector(
    (state) => state?.customer?.data?.orderProducts
  );

  return (
    <div
      className="order-items-user-account"
      data-testid="order-items-user-account"
    >
      {orderProducts &&
        orderProductsStore &&
        orderProductsStore
          .filter((ps) =>
            orderProducts.some((p) => p.productsId === ps.productsId)
          )
          .map((product) => {
            const { name, pricing, image } = getProductProperties(
              product.productsId,
              state
            );
            return (
              <div key={product.productsId} className="order-item-user-account">
                <div className="order-info">
                  <p>
                    <span className="dotted">Nom du produit</span> :{" "}
                    {name || "Non disponible"}
                  </p>
                  {product?.material !== 0 && (
                    <p>
                      <span className="dotted">Matériau</span> :{" "}
                      {name && getMaterialProperty(product?.material).name}
                    </p>
                  )}
                  <p>
                    <span className="dotted">Quantité</span> :{" "}
                    {product?.quantity}
                  </p>
                  <p>
                    <span className="dotted">Prix unitaire</span> :{" "}
                    {formatPrice(pricing?.currentPrice)}
                  </p>
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
              </div>
            );
          })}
    </div>
  );
};

export default Item;
