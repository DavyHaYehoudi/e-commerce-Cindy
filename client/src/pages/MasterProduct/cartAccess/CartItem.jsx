import React from "react";
import { Link } from "react-router-dom";
import QuantitySelectProduct from "../../../shared/QuantitySelectProduct";
import TrashIcon from "../../../shared/TrashIcon";
import useCartItem from "../hooks/useCartItem";
import { formatPrice } from "../../../helpers/utils/prices";

const CartItem = ({ product }) => {
  const {
    imageUrl,
    itemName,
    quantity,
    itemPrice,
    itemSubtotal,
    handleRemoveToCart,
  } = useCartItem(product);

  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="info-tooltip" aria-label="Revenir à l'article">
          <Link
            to={`/master-product/${product.productsId}`}
            state={{ materialId: product.material }}
          >
            <img src={imageUrl} alt={itemName} width="75px" height="75px" />
          </Link>
        </div>
        <div className="cart-item-name">{itemName}</div>
      </div>
      <div className="cart-item-bottom">
        <div className="cart-item-subtotal">
          {quantity} x {formatPrice(itemPrice)} = {itemSubtotal}
        </div>
        <div className="cart-item-quantity">
          <QuantitySelectProduct
            productId={product.productsId}
            materialId={product.material}
          />
        </div>
        <div className="cart-item-delete" onClick={handleRemoveToCart}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
