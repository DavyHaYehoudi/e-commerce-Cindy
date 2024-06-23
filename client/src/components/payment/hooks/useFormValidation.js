import { useState } from "react";
import { Post } from "../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { useSelector } from "react-redux";

const useFormValidation = () => {
  const advantages = useSelector(state=>state?.product?.advantages)
  const [formData, setFormData] = useState({
    delivery: {},
    card: {},
    billing: {},
    rememberMe: true,
    isBillingSameAddress: true,
    advantages
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const handleUnauthorized = useUnauthorizedRedirect();

  const updateData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleCheckboxChange = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
  };

  const clearValidationError = (section, field) => {
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[section]) {
        delete newErrors[section][field];
        if (Object.keys(newErrors[section]).length === 0) {
          delete newErrors[section];
        }
      }
      return newErrors;
    });
  };
  const handleSubmit = async (requiredFields) => {
    const errors = {};
    const valid = {};

    Object.keys(requiredFields).forEach((section) => {
      if (section === "billing" && formData.isBillingSameAddress) {
        return;
      }
      requiredFields[section].forEach((field) => {
        if (!formData[section][field]) {
          if (!errors[section]) errors[section] = {};
          errors[section][field] = "Ce champ est requis";
        } else {
          if (!valid[section]) valid[section] = {};
          valid[section][field] = true;
        }
      });
    });

    setValidationErrors(errors);
    setValidFields(valid);

    // Si aucune erreur, procéder au paiement
    if (Object.keys(errors).length === 0) {
      try {
        console.log('formData:', formData)
        await Post("orders", formData, null, handleUnauthorized);
      } catch (error) {
        console.log("Erreur lors du paiement :", error);
      }
    }
  };
  return {
    formData,
    validationErrors,
    validFields,
    updateData,
    handleCheckboxChange,
    handleSubmit,
    clearValidationError,
  };
};

export default useFormValidation;
