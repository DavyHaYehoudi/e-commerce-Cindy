import React from "react";
import { useSelector } from "react-redux";
import { getStepColor } from "../../../../helpers/utils/getStepColor";
import { getOrderStepProperty } from "../../../../helpers/constants/orderStep";
import { getOrderInfo } from "../../../../selectors/order";

const Badge = ({ step, orderIds, orderId, count, setSelectedOrderId }) => {
  const stepColor = getStepColor(step);
  const badgeClass = `admin-badge`;
  const style = { backgroundColor: stepColor };

  const handleClick = () => {
    setSelectedOrderId(orderIds);
  };

  const isClientNotifiedForThisOrder = useSelector((state) => {
    const orderInfo = getOrderInfo(state, orderId);
    return orderInfo ? orderInfo.isClientNotified : undefined;
  });

  return (
    <span className={badgeClass} style={style} onClick={handleClick}>
      {getOrderStepProperty(step)?.name} ({count})
      {!isClientNotifiedForThisOrder && (
        <span
          className="notification-bubble-order blink"
          data-testid="notification-bubble"
        ></span>
      )}
    </span>
  );
};

export default Badge;
