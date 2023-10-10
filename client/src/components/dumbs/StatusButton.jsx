import { FcCheckmark } from "react-icons/fc";
import { MdOutlineAppRegistration } from "react-icons/md";
import { RiPassValidFill } from "react-icons/ri";

const StatusButtons = ({ isModified, handleSendToDatabase }) => {
  return (
    <div className="status-buttons">
      <button onClick={handleSendToDatabase}>
        <RiPassValidFill />
      </button>
      {!isModified&&
        <button>
          <FcCheckmark />
        </button>
      }
      { isModified && (
        <button>
          <MdOutlineAppRegistration />
        </button>
      )}
    </div>
  );
};

export default StatusButtons;
