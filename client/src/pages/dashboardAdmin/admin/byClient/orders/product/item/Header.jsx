import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { formatDate } from "../../../../../../../helpers/utils/formatDate";
import {
  formatPrice,
  sumPriceArticle,
} from "../../../../../../../helpers/utils/prices";
import { getMaterialProperty } from "../../../../../../../selectors/material";
import { Link } from "react-router-dom";
import useProductHeader from "./hooks/useProductHeader";

const Header = ({
  interaction,
  material,
  quantity,
  productsId,
  orderProducts,
  isTagProductExisted,
  orderProductsInfo,
  productStore,
  toggleActions,
  getOneOrderProducts,
}) => {
  const {
    amount,
    code,
    dateExpire,
    collection,
    category,
    name,
    imageUrl,
    materialStore,
  } = useProductHeader(orderProducts, productsId, productStore, material)||{};

  const { originalPrice, finalPrice, amountPromotion } =
    getOneOrderProducts || "";
  const { exchange, refund, credit } = orderProductsInfo ?? {};

  return (
    <>
      <p
        className="action-icon"
        onClick={toggleActions}
        data-testid="header-component"
      >
        {" "}
        {interaction.isActionsOpen ? (
          <FaEllipsisVertical />
        ) : (
          <IoEllipsisHorizontal />
        )}
      </p>
      <div className="product-content-details">
        <div>
          <h3>
            {name} {getMaterialProperty(material, materialStore)?.name}
          </h3>
          <p>Collection : {collection}</p>
          <p>Catégorie : {category}</p>
          <p>Prix original : {formatPrice(originalPrice)} </p>
          <p>
            Promotion : {amountPromotion ? amountPromotion + "%" : "aucune"}{" "}
          </p>
          <p>Prix final : {formatPrice(finalPrice)} </p>
          <p className="pricing inPricing">
            {quantity} article
            {quantity > 1 ? "s" : ""} -{" "}
            {sumPriceArticle(quantity, finalPrice)}
          </p>
        </div>
        <Link
          to={`/master-product/${productsId}`}
          state={{ materialId: material }}
        >
          <img src={imageUrl} alt={name} width="150px" />
        </Link>
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
                <span className="pricing outPricing">
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
                  <span className="pricing outPricing">
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
    </>
  );
};

export default Header;
