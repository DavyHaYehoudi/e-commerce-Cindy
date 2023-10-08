import React from "react";
import { Link } from "react-router-dom";
import QuantitySelectProduct from "../dumbs/QuantitySelectProduct";
import TrashIcon from "../dumbs/TrashIcon";

const CartItem = ({ cart }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="info-tooltip" aria-label="Revenir à l'article">
          <Link>
            <img src={cart} alt="" width="75px" height="75px" />
          </Link>
        </div>

        <div className="cart-item-name">
          Nom de l'article qui parfois peut être tres long{" "}
        </div>
      </div>
      <div className="cart-item-bottom">
        <div className="cart-item-subtotal">1 x €25 = €25</div>
        <div className="cart-item-quantity">
          <QuantitySelectProduct />
        </div>
        <div className="cart-item-delete">
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
