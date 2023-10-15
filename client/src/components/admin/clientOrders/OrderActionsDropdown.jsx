import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder, moveToNextStep,  } from "../../../features/orderStepSlice";
import { orderStep } from "../../../mocks/orderStep";

const OrderActionsDropdown = ({ order, step }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //   FACTURE
  //   {order.Step === orderStep[2].name && (
  //     <Link
  //       to={`/admin/generate-invoice/${order.id}`}
  //       state={{ order: orderMock[0], user: userMock }}
  //     >
  //       <button className="account-btn toggle">Générer la facture</button>
  //     </Link>
  //   )}
  const handleMoveToNextStep = () => {
    dispatch(
      moveToNextStep({
        orderId: order.id,
        isInProcessingOrder: true,
        isClientNotified: false,
        isNewOrder: false,
        step,
        isNextStepOrder:true,
        isProcessed:false,
      })
    );
    setIsOpen(false);
  };
  const handleCancelOrder = () => {
    dispatch(
     cancelOrder({
        orderId: order.id,
        isInProcessingOrder: true,
        isClientNotified: false,
        isNewOrder: false,
        step :orderStep[3].name,
        isProcessed:false,
      })
    );
    setIsOpen(false);
  };


  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        ...
      </button>
      <div className="dropdown-menu">
        <button onClick={() => handleMoveToNextStep()}>
          Passer à l'étape suivante
        </button>
        <button >Générer la facture</button>
        <button onClick={() => handleCancelOrder()}>
          Annuler cette commande
        </button>
        <div className="dropdown-separator"></div>
        <button>
          Envoyer la fiche au client
        </button>
      </div>
    </div>
  );
};

export default OrderActionsDropdown;
