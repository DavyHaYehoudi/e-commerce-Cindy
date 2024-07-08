import React from "react";
import { Link } from "react-router-dom";
import QuantitySelectProduct from "./QuantitySelectProduct";
import TrashIcon from "./TrashIcon";
import useCartItem from "./hooks/useCartItem";
import { formatPrice } from "../helpers/utils/prices";
import useQuantitySelectProduct from "./hooks/useQuantitySelectProduct";

const CartItem = ({ product }) => {
  const {
    imageUrl,
    itemName,
    quantity,
    price,
    itemSubtotal,
    handleRemoveToCart,
  } = useCartItem(product);
  const {stockMaxProduct } = useQuantitySelectProduct(
    product?.productsId,
    product?.material
  ); 

  return ( 
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="info-tooltip" aria-label="Revenir à l'article">
          <Link
            to={`/master-product/${product?.productsId}`}
            state={{ materialId: product?.material }}
          >
            <img src={imageUrl} alt={itemName} width="75px" height="75px" />
          </Link>
        </div>
        <div className="cart-item-name">{itemName}</div>
      </div>
      <div className="cart-item-bottom">
        <div className="cart-item-subtotal">
          {quantity} x {formatPrice(price)} = {itemSubtotal}
        </div>
        <div className="cart-item-quantity">
          <QuantitySelectProduct
            productId={product?.productsId}
            materialId={product?.material}
          />
        </div>
        <div className="cart-item-delete" onClick={handleRemoveToCart}>
          <TrashIcon />
        </div>
      </div>
      <small className="stock-number" >Limité à : {stockMaxProduct} </small>
    </div>
  );
};

export default CartItem;
