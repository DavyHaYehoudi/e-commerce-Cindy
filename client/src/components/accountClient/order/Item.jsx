import React from "react";
import { Link } from "react-router-dom";
// import TrackingField from "../../../shared/TrackingField";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../selectors/product";
import { getMaterialProperty } from "../../../helpers/constants/materials";
import { formatPrice } from "../../../helpers/utils/prices";

const Item = ({ productsByOrder, isReturnProduct }) => {
  const state = useSelector((state) => state?.product?.data);
  const productsByOrderStore = useSelector(
    (state) => state?.customer?.data?.productsByOrder
  );

  return (
    <div
      className="order-items-user-account"
      data-testid="order-items-user-account"
    >
      {productsByOrder &&
        productsByOrderStore &&
        productsByOrderStore
          .filter((ps) =>
            productsByOrder.some((p) => p.productId === ps.productId)
          )
          .map((product) => {
            const { name, pricing, image } = getProductProperties(
              product.productId,
              state
            );
            return (
              <div key={product.productId} className="order-item-user-account">
                <div className="order-info">
                  <p>
                    <span className="dotted">Nom du produit</span> :{" "}
                    {name || "Non disponible"}
                  </p>
                  <p>
                    <span className="dotted">Matériau</span> :{" "}
                    {name && getMaterialProperty(product?.material).name}
                  </p>
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
                {/* {isReturnProduct && <TrackingField isAdmin={false} />} */}
              </div>
            );
          })}
    </div>
  );
};

export default Item;
