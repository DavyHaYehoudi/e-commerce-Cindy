import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getOrderInfo,
  getProductStateInfo,
} from "../../../../../helpers/storeDataUtils";

const Summary = ({
  initialText,
  hiddenText,
  content,
  buttonClass,
  clientId,
  orderId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const state = useSelector((state) => state.ordersStep);
  const { isAnyProductClientNotified } = getProductStateInfo(
    state,
    clientId,
    orderId
  );
  const isClientNotifiedOrder =
    getOrderInfo(state, clientId, orderId).isClientNotified === false;

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <button className={buttonClass} onClick={handleToggle}>
        {(isAnyProductClientNotified || isClientNotifiedOrder) && (
          <span className="notification-bubble-order blink"></span>
        )}
        {isVisible ? hiddenText : initialText}
      </button>

      {isVisible && content}
    </div>
  );
};

export default Summary;
