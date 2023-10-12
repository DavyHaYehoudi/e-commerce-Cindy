import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import StatusButtons from "../../dumbs/StatusButton";
import { Link } from "react-router-dom";
import { orderMock } from "../../../mocks/orderMock";
import { userMock } from "../../../mocks/userMock";
import { orderStatus } from "../../../mocks/orderStatus";

const OrderHeader = ({ order, handleSendToDatabase }) => {
  return (
    <div className="admin-order-item-header">
      <p>Date de commande : {formatDate(order.date)}</p>
      {order.status === orderStatus[2].name && (
        <Link
          to={`/admin/generate-invoice/${order.id}`}
          state={{ order: orderMock[0], user: userMock }}
        >
          <button className="account-btn toggle">
            Générer la facture
          </button>
        </Link>
      )}
    </div>
  );
};

export default OrderHeader;
