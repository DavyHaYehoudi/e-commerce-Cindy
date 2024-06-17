import React from "react";
import { getProductProperties } from "../../../../selectors/product";
import { useSelector } from "react-redux";
import { getMaterialProperty } from "../../../../selectors/material";
import { formatPrice, sumPriceArticle } from "../../../../helpers/utils/prices";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { getProductsInfo } from "../../../../selectors/orderProducts";
import useFirebaseImage from "../../../../shared/hooks/useFirebaseImage";

const OrderProductsDetails = ({
  orderProductsItem,
  orderProductsStore,
  orderId,
}) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);
  const ordersStore = useSelector((state) => state?.customer?.data?.orders);
  const creditStore = useSelector((state) => state?.customer?.data?.credit);
  const { amount, code, dateExpire } =
    creditStore?.find((cdt) => cdt.orderProductsId === orderProductsItem._id) ||
    {};

  const { productsId, material, quantity } = orderProductsItem || {};
  const { orderProductsInfo, isTagProductExisted } = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId,
    orderProductsItem._id
  );

  const { name, pricing, main_image, collection, category } =
    getProductProperties(
      productsId,
      productStore,
      collectionStore,
      categoryStore,
      tagStore,
      material
    );
  const { exchange, refund, credit } = orderProductsInfo ?? {};
  const {imageUrl}=useFirebaseImage(main_image)
  return (
    <div key={productsId} className="order-item-user-account">
      <div>
        <h3>
          {name} {getMaterialProperty(material, materialStore)?.name}
        </h3>
        <p className="pricing">
          {quantity} article
          {quantity > 1 ? "s" : ""} -{" "}
          {sumPriceArticle(quantity, pricing?.currentPrice)}
        </p>
        <p>Collection : {collection}</p>
        <p>Catégorie : {category}</p>
      </div>
      <div
        className="image-container info-tooltip"
        aria-label="Revenir au produit"
      >
        <Link>
          <img
            src={imageUrl}
            alt={name || "Non disponible"}
            style={{ width: "100px", height: "150px" }}
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
