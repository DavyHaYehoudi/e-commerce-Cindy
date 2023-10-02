import React from "react";
import QuantitySelectProduct from "./QuantitySelectProduct";

const OrderItem = ({ cart }) => {
  return (
    <div className="orderItem-contain">
      <div className="orderItem-product">
        <div className="orderItem-img">
          <img src={cart} alt="" width="100px" height="200px" />
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
      </div>
      <div className="orderItem-total">€239,00</div>
    </div>
  );
};

export default OrderItem;
