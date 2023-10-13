import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";

const StatusButtons = ({ clientId, handleSendToDatabase, orderIndex }) => {
  const ordersStatus = useSelector((state) => state.ordersStatus);

  const clientIndex = ordersStatus.findIndex(
    (client) => client.id === clientId
  );
  const isClientNotified =
    ordersStatus[clientIndex]?.orders[orderIndex]?.isClientNotified || false;

  return (
    <div className="status-buttons">
      {isClientNotified && (
        <>
          <span className="send">Fiche envoyée</span>
          <FcCheckmark />
        </>
      )}
      {!isClientNotified && (
        <>
          <button
            onClick={handleSendToDatabase}
            className="account-btn not-send"
          >
            Envoyer la fiche
          </button>
          <FaAddressCard className="not-send-icon" />
        </>
      )}
    </div>
  );
};

export default StatusButtons;
