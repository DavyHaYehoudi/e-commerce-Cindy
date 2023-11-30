import { getStepColor } from "../../../../../helpers/getStepColor";
import { getOrderInfo } from "../../../../../helpers/storeDataUtils";

export const renderBadge = (
  ordersStore,
  step,
  client,
  setSelectedOrderId,
  orderIds,
  orderId,
  setIsOrderOpened,
  stepSelected,
  setStepSelected
) => {
  const orders = ordersStore.find((user) => user.id === client.id)?.orders;
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
      client.id,
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
