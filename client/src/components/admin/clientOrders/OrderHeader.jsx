import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import StatusButtons from "../../dumbs/StatusButton";
import { Link } from "react-router-dom";
import { ordersMock } from "../../../mocks/ordersMock";
import { userInfo } from "../../../mocks/userInfo";
import { orderStatus } from "../../../mocks/orderStatus";

const OrderHeader = ({ order, handleSendToDatabase, isModified }) => {
  return (
    <div className="admin-order-item-header">
      <p>Date de commande : {formatDate(order.date)}</p>
      {order.status === orderStatus[2].name && (
        <Link
          to={`/admin/generate-invoice/${order.id}`}
          state={{ order: ordersMock[0], user: userInfo }}
        >
          <button className="account-btn toggle">
            Générer la facture
          </button>
        </Link>
      )}
      <StatusButtons
        isModified={isModified}
        handleSendToDatabase={handleSendToDatabase}
      />
    </div>
  );
};

export default OrderHeader;
