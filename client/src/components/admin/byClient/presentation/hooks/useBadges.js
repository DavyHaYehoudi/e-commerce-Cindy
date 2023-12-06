import { useState } from "react";
import { getStepColor } from "../../../../../helpers/getStepColor";
import { getOrderStepProperty } from "../../../../../helpers/constants/orderStep";
import { getOrderInfo } from "../../../../../selectors/order";

const useBadges = (ordersStore, orders, setSelectedOrderId) => {
  const [isOrderOpened, setIsOrderOpened] = useState(false);
  const [stepSelected, setStepSelected] = useState("");

  const renderBadge = (step, orderIds, orderId) => {
    const count = orders?.filter((order) => order.step === step).length;

    if (count > 0) {
      const stepColor = getStepColor(step);
      const badgeClass = `admin-badge`;
      const style = { backgroundColor: stepColor };

      const handleClick = () => {
        setIsOrderOpened((prevIsOrderOpened) =>
          step === stepSelected ? !prevIsOrderOpened : true
        );
        setSelectedOrderId(orderIds);
        setStepSelected((prevStep) => (prevStep === step ? "" : step));
      };

      const isClientNotifiedForThisOrder = getOrderInfo(
        ordersStore,
        orderId
      ).isClientNotified;

      return (
        <span className={badgeClass} style={style} onClick={handleClick}>
          {getOrderStepProperty(step).name} ({count})
          {!isClientNotifiedForThisOrder && (
            <span className="notification-bubble-order blink"></span>
          )}
        </span>
      );
    }

    return null;
  };

  return {
    isOrderOpened,
    renderBadge,
  };
};

export default useBadges;
