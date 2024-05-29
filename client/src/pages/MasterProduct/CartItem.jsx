import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuantitySelectProduct from "../../shared/QuantitySelectProduct";
import TrashIcon from "../../shared/TrashIcon";
import { getProductProperties } from "../../selectors/product";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/utils/prices";

const CartItem = ({ cart }) => {
  const [coefficient, setCoefficient] = useState(1);
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const handleChangeQuantity = (quantity) => {
    setCoefficient(quantity);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="info-tooltip" aria-label="Revenir à l'article">
          <Link>
            <img
              src={`/photos/${
                getProductProperties(
                  cart?.productsId,
                  productStore,
                  collectionStore,
                  categoryStore,
                  tagStore,
                  cart?.material
                ).main_image
              }`}
              alt={
                getProductProperties(
                  cart?.productsId,
                  productStore,
                  collectionStore,
                  categoryStore,
                  tagStore,
                  cart?.material
                ).name
              }
              width="75px"
              height="75px"
            />
          </Link>
        </div>

        <div className="cart-item-name">
          {
            getProductProperties(
              cart?.productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              cart?.material
            ).name
          }
        </div>
      </div>
      <div className="cart-item-bottom">
        <div className="cart-item-subtotal">
          {coefficient} x{" "}
          {formatPrice(
            getProductProperties(
              cart?.productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              cart?.material
            )?.pricing.currentPrice
          )}{" "}
          ={" "}
          {formatPrice(
            getProductProperties(
              cart?.productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              cart?.material
            )?.pricing.currentPrice * coefficient
          )}
        </div>
        <div className="cart-item-quantity">
          <QuantitySelectProduct handleChangeQuantity={handleChangeQuantity} />
        </div>
        <div className="cart-item-delete">
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
