import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { formatDate } from "../../helpers/formatDate";

const StatusButtons = ({ clientId, handleSendToDatabase, orderIndex }) => {
  const ordersStatus = useSelector((state) => state.ordersStatus);

  const clientIndex = ordersStatus.findIndex(
    (client) => client.id === clientId
  );
  const isClientNotified =
    ordersStatus[clientIndex]?.orders[orderIndex]?.isClientNotified || false;
  const isNewOrder =
    ordersStatus[clientIndex]?.orders[orderIndex]?.isNewOrder || false;
  const lastSentDateToClient =
    ordersStatus[clientIndex]?.orders[orderIndex]?.lastSentDateToClient ||
    false;

  return (
    <div className="status-buttons">
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

export default StatusButtons;
