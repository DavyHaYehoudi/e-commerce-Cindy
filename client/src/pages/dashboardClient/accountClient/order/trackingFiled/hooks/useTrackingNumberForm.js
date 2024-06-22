import { useState } from "react";
import useTrackingNumberCreate from "./useTrackingNumberCreate";

const useTrackingNumberForm = (orderId) => {
  const [errors, setErrors] = useState({ trackingField: "", date: "" });
  const [trackingInfo, setTrackingInfo] = useState({
    trackingField: "",
    date: "",
  });

  const { handleValidate, handleCancel } = useTrackingNumberCreate({
    setErrors,
    setTrackingInfo,
    orderId,
  });

  const isFormValid = !errors.trackingField && !errors.date;

  const handleInputChange = (field, value) => {
    setTrackingInfo({
      ...trackingInfo,
      [field]: value,
    });
    setErrors({ ...errors, [field]: "" });
  };

  return {
    errors,
    trackingInfo,
    isFormValid,
    handleInputChange,
    handleValidate,
    handleCancel,
  };
};

export default useTrackingNumberForm;
