import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { formatDate } from "../../helpers/formatDate";

const StepButtons = ({ clientId, handleSendToDatabase, orderIndex }) => {
  const ordersStep = useSelector((state) => state.ordersStep);

  const clientIndex = ordersStep.findIndex(
    (client) => client.id === clientId
  );
  const isClientNotified =
    ordersStep[clientIndex]?.orders[orderIndex]?.isClientNotified || false;
  const isNewOrder =
    ordersStep[clientIndex]?.orders[orderIndex]?.isNewOrder || false;
  const lastSentDateToClient =
    ordersStep[clientIndex]?.orders[orderIndex]?.lastSentDateToClient ||
    false;

  return (
    <div className="Step-buttons">
      {!isNewOrder && isClientNotified && (
        <>
          <span className="send">Fiche envoyée</span>
          <FcCheckmark />
          {lastSentDateToClient && (
            <p>
              <small>Dernier envoi : {formatDate(lastSentDateToClient)} </small>{" "}
            </p>
          )}
        </>
      )}
      {!isClientNotified && (
        <>
          <button
            onClick={handleSendToDatabase}
            className="account-btn not-send"
          >
            Envoyer la fiche au client
            <FaAddressCard className="not-send-icon" />
          </button>
          {lastSentDateToClient && (
            <p>
              <small>Dernier envoi : {formatDate(lastSentDateToClient)} </small>{" "}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default StepButtons;
