import React from "react";
import QuantitySelectProduct from "./QuantitySelectProduct";
import { Link } from "react-router-dom";

const OrderItem = ({ cart }) => {
  return (
    <div className="orderItem-contain">
      <div className="orderItem-product">
        <div
          className="orderItem-img info-tooltip"
          aria-label="Revenir à l'article"
        >
          <Link>
            <img src={cart} alt="" width="100px" height="150px" />
          </Link>
        </div>
        <div className="orderItem-details">
          <div className="orderItem-name">
            Le fameux titre qui peut parfois être long
          </div>
          <div className="orderItem-price">€239,00</div>
        </div>
      </div>
      <div className="orderItem-quantity">
        <QuantitySelectProduct />
        <p className="orderItem-delete">supprimer</p>
      </div>
      <div className="orderItem-total">€239,00</div>
    </div>
  );
};

export default OrderItem;
