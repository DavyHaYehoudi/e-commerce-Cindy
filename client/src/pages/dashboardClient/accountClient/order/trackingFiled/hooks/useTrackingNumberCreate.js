import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addClientTrackingNumber } from "../../../../../../features/accountClient/customerSlice";
import useUnauthorizedRedirect from "../../../../../../services/errors/useUnauthorizedRedirect";

const useTrackingNumberCreate = ({ setErrors, setTrackingInfo, orderId }) => {
  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleValidate = (trackingInfo) => {
    const { trackingField, date } = trackingInfo;

    const newErrors = {};

    if (!trackingField.trim()) {
      newErrors.trackingField = "⚠️ Veuillez définir un numéro de suivi.";
    }

    if (!date) {
      newErrors.date = "⚠️ Veuillez choisir une date d'envoi.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(
      addClientTrackingNumber({
        orderId,
        trackingNumber: {
          id: uuidv4(),
          isAdmin: false,
          value: trackingField,
          date: date,
        },
        handleUnauthorized,
      })
    );

    setErrors({});
    setTrackingInfo({ trackingField: "", date: "" });
  };

  const handleCancel = () => {
    setTrackingInfo({ trackingField: "", date: "" });
    setErrors({});
  };

  return {
    handleValidate,
    handleCancel,
  };
};

export default useTrackingNumberCreate;
