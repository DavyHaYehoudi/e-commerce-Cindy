import { useState } from "react";
import Badge from "../Badge";

const useBadges = (orders, setSelectedOrderId) => {
  const [isOrderOpened, setIsOrderOpened] = useState(false);
  const [,setStepSelected] = useState("");

  const renderBadge = (step, orderIds, orderId) => {
    const count = orders?.filter((order) => order.step === step).length;
    if (count > 0) {
      return (
        <Badge
          step={step}
          orderIds={orderIds}
          orderId={orderId}
          count={count}
          setSelectedOrderId={setSelectedOrderId}
          setStepSelected={setStepSelected}
          setIsOrderOpened={setIsOrderOpened}
        />
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
