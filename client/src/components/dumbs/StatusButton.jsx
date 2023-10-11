import { FcCheckmark } from "react-icons/fc";

const StatusButtons = ({ isModified, handleSendToDatabase }) => {
  return (
    <div className="status-buttons">
      {!isModified && (
        <button className="updated">
          <FcCheckmark />
        </button>
      )}
      {isModified && (
        <button onClick={handleSendToDatabase} className="account-btn send">
          Valider la fiche
        </button>
      )}
    </div>
  );
};

export default StatusButtons;
