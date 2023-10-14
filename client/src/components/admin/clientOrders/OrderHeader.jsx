import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import StatusButtons from "../../dumbs/StatusButton";
import { Link } from "react-router-dom";
import { orderMock } from "../../../mocks/orderMock";
import { userMock } from "../../../mocks/userMock";
import { orderStatus } from "../../../mocks/orderStatus";
import { AiFillDelete } from "react-icons/ai";
import { RiArrowTurnBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { handleOrderStatusChange } from "../../../features/orderStatusSlice";

const OrderHeader = ({ clientId, order, handleSendToDatabase, orderIndex,lastSentDateToClient }) => {
  const dispatch = useDispatch();
  const ordersStatus = useSelector(
    (state) => state.ordersStatus.find((user) => user.id === clientId)?.orders
  );

  const isCancelled = ordersStatus[orderIndex]?.status === orderStatus[3].name;
  console.log('isCancelled:', isCancelled)

  return (
    <div className="admin-order-item-header">
      <div className="admin-order-item-header order-header">
        <p>Date de commande : {formatDate(order.date)}</p>
        <div className="orderCancelled">
          {!isCancelled && (
            <p
              onClick={() =>
                dispatch(
                  handleOrderStatusChange({
                    orderId: order.id,
                    status: orderStatus[3].name,
                  })
                )
              }
              className="account-btn orderActive-action"
            >
              <span>Annuler la commande</span>
              <AiFillDelete />
            </p>
          )}
          {isCancelled && (
            <p
              onClick={() =>
                dispatch(
                  handleOrderStatusChange({
                    orderId: order.id,
                    status: orderStatus[1].name,
                  })
                )
              }
              className="account-btn orderCancelled-action"
            >
              <RiArrowTurnBackFill />
              <span>Réactiver la commande</span>{" "}
            </p>
          )}
        </div>
      </div>
      {order.status === orderStatus[2].name && (
        <Link
          to={`/admin/generate-invoice/${order.id}`}
          state={{ order: orderMock[0], user: userMock }}
        >
          <button className="account-btn toggle">Générer la facture</button>
        </Link>
      )}
      <StatusButtons
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        handleSendToDatabase={handleSendToDatabase}
        lastSentDateToClient={lastSentDateToClient}
      />
    </div>
  );
};

export default OrderHeader;
