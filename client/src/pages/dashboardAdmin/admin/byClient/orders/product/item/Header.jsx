import React from "react";
import { getProductProperties } from "../../../../../../../selectors/product";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { formatDate } from "../../../../../../../helpers/utils/formatDate";
import {
  formatPrice,
  sumPriceArticle,
} from "../../../../../../../helpers/utils/prices";
import { getCreditsInfo } from "../../../../../../../selectors/credit";
import { useSelector } from "react-redux";
import { getMaterialProperty } from "../../../../../../../selectors/material";

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
}) => {
  const { amount, code, dateExpire } =
    useSelector((state) =>
      getCreditsInfo(state, { productsId: orderProducts._id })
    ) || {};
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);

  const { collection, category, name, pricing, main_image } =
    getProductProperties(
      productsId,
      productStore,
      collectionStore,
      categoryStore,
      tagStore,
      material
    ) || {};
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
          <p className="pricing inPricing">
            {quantity} article
            {quantity > 1 ? "s" : ""} -{" "}
            {sumPriceArticle(quantity, pricing?.currentPrice)}
          </p>
          <p>Collection : {collection}</p>
          <p>Catégorie : {category}</p>
        </div>
        <img src={`/photos/${main_image}`} alt={name} width="150px" />
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
                  {sumPriceArticle(parseInt(refund), pricing?.currentPrice)}
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
