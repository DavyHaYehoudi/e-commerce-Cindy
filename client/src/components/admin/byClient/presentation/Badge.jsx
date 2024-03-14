import React from "react";
import { useSelector } from "react-redux";
import { getStepColor } from "../../../../helpers/utils/getStepColor";
import { getOrderStepProperty } from "../../../../helpers/constants/orderStep";

const Badge = ({ step, orderIds, orderId, count, setSelectedOrderId }) => {
  const stepColor = getStepColor(step);
  const badgeClass = `admin-badge`;
  const style = { backgroundColor: stepColor };

  const handleClick = () => {
    setSelectedOrderId(orderIds);
  };

  const allOrderNotNotified = useSelector(
    (state) => state?.orders?.isClientNotified
    );
  const isClientNotifiedForThisOrder = allOrderNotNotified.find(
    (item) => item === orderId
    );

  return (
    <span className={badgeClass} style={style} onClick={handleClick}>
      {getOrderStepProperty(step)?.name} ({count})
      {(isClientNotifiedForThisOrder || step === 0) && (
        <span
          className="notification-bubble-order blink"
          data-testid="notification-bubble"
        ></span>
      )}
    </span>
  );
};

export default Badge;
