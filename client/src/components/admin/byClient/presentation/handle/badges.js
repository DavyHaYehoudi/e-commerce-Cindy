import { getStepColor } from "../../../../../helpers/getStepColor";
import { getOrderInfo } from "../../../../../helpers/selectors/order";

export const renderBadge = (
  ordersStore,
  orders,
  step,
  setSelectedOrderId,
  orderIds,
  orderId,
  setIsOrderOpened,
  stepSelected,
  setStepSelected
) => {

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

    return {
      stepBadge: (
        <>
          <span className={badgeClass} style={style} onClick={handleClick}>
            {step} ({count})
            {!isClientNotifiedForThisOrder && (
              <span className="notification-bubble-order blink"></span>
            )}         
          </span>
        </>
      ),
    };
  }

  return { stepBadge: null };
};
