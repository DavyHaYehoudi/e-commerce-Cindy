import React, { useState } from "react";
import QuantitySelectProduct from "../../shared/QuantitySelectProduct";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/utils/prices";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../selectors/product";

const OrderItem = ({ cart }) => {
  const [coefficient, setCoefficient] = useState(1);
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);

  const handleChangeQuantity = (quantity) => {
    setCoefficient(quantity);
  };
  return (
    <div className="orderItem-contain">
      <div className="orderItem-product">
        <div
          className="orderItem-img info-tooltip"
          aria-label="Revenir à l'article"
        >
          <Link>
            <img
              src={`/photos/${
                getProductProperties(
                  cart.productsId,
                  productStore,
                  collectionStore,
                  categoryStore,
                  tagStore,
                  cart.material
                ).main_image
              }`}
              alt={
                getProductProperties(
                  cart.productsId,
                  productStore,
                  collectionStore,
                  categoryStore,
                  tagStore,
                  cart.material
                ).name
              }
              width="100px"
              height="150px"
            />
          </Link>
        </div>
        <div className="orderItem-details">
          <div className="orderItem-name">
            {
              getProductProperties(
                cart.productsId,
                productStore,
                collectionStore,
                categoryStore,
                tagStore,
                cart.material
              ).name
            }
          </div>
          <div className="orderItem-price">
            {formatPrice(
              getProductProperties(
                cart.productsId,
                productStore,
                collectionStore,
                categoryStore,
                tagStore,
                cart.material
              )?.pricing.currentPrice
            )}{" "}
          </div>
        </div>
      </div>
      <div className="orderItem-quantity">
        <QuantitySelectProduct handleChangeQuantity={handleChangeQuantity} />
        <p className="orderItem-delete">supprimer</p>
      </div>
      <div className="orderItem-total">
        {formatPrice(
          getProductProperties(
            cart.productsId,
            productStore,
            collectionStore,
            categoryStore,
            tagStore,
            cart.material
          )?.pricing.currentPrice * coefficient
        )}{" "}
      </div>
    </div>
  );
};

export default OrderItem;
