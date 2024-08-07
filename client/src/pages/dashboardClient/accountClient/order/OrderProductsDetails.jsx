import React from "react";
import { formatPrice, sumPriceArticle } from "../../../../helpers/utils/prices";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../helpers/utils/formatDate";
import useOrderProductDetails from "./hooks/useOrderProductDetails";

const OrderProductsDetails = ({
  orderProductsItem,
  orderProductsStore,
  orderId,
}) => {
  const {
    name,
    collection,
    category,
    exchange,
    refund,
    credit,
    amount,
    code,
    dateExpire,
    productsId,
    quantity,
    material,
    materialName,
    isTagProductExisted,
    imageUrl,
    finalPrice,
    originalPrice,
    amountPromotion,
  } = useOrderProductDetails(orderProductsItem, orderProductsStore, orderId);
  return (
    <div key={productsId} className="order-item-user-account">
      <div>
        <h3>
          {name} {materialName}
        </h3>
        <p className="pricing">
          {quantity} article
          {quantity > 1 ? "s" : ""} - {sumPriceArticle(quantity, finalPrice)}
        </p>
        <p>
          <span className="underline"> Collection </span>
          <span>: {collection}</span>{" "}
        </p>
        <p>
          <span className="underline"> Catégorie </span>
          <span>: {category}</span>{" "}
        </p>
        <p>
          <span className="underline"> Prix original </span>
          <span>: {formatPrice(originalPrice)} </span>{" "}
        </p>
        <p>
          <span className="underline"> Promotion </span>
          <span>
            : {amountPromotion ? amountPromotion + "%" : "aucune"}
          </span>{" "}
        </p>
        <p>
          <span className="underline"> Prix final </span>
          <span>: {formatPrice(finalPrice)}</span>{" "}
        </p>
      </div>
      <div
        className="image-container info-tooltip"
        aria-label="Revenir au produit"
      >
        <Link
          to={`/master-product/${productsId}`}
          state={{ materialId: material }}
        >
          <img
            src={imageUrl}
            alt={name || "Non disponible"}
            style={{ width: "150px", height: "150px" }}
          />
        </Link>
      </div>
      <ul>
        <li className={isTagProductExisted && exchange ? "product-tag" : ""}>
          {exchange && (
            <>
              <span>ECHANGE :</span>{" "}
              <span>
                ({exchange} article{exchange > 1 ? "s" : ""}){" "}
              </span>
            </>
          )}
        </li>
        <li className={isTagProductExisted && refund ? "product-tag" : ""}>
          {refund && (
            <>
              <span>REMBOURSEMENT :</span>{" "}
              <span className="pricing inPricing">
                {sumPriceArticle(parseInt(refund), finalPrice)}
              </span>
            </>
          )}
        </li>
        <li className={isTagProductExisted && credit ? "product-tag" : ""}>
          {credit && (
            <ul>
              <li>
                AVOIR :{" "}
                <span className="pricing inPricing">
                  {" "}
                  {formatPrice(amount)}
                </span>
              </li>
              <li> Nᴼ {code || " - - - en cours - - -"} </li>
              <li>Valable jusqu'au {formatDate(dateExpire)}</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default OrderProductsDetails;
