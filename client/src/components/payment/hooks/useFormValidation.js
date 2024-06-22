import { useState } from "react";

const useFormValidation = () => {
  const [formData, setFormData] = useState({
      delivery: {},
      card: {},
      billing: {},
      rememberMe: true,
      isBillingAddress: true,
    });
  const [validationErrors, setValidationErrors] = useState({});
  const [validFields, setValidFields] = useState({});

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
  const handleSubmit = (requiredFields) => {
    const errors = {};
    const valid = {};

    Object.keys(requiredFields).forEach((section) => {
      if (section === "billing" && formData.isBillingAddress) {
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

    // Si aucun erreur, procéder au paiement
    if (Object.keys(errors).length === 0) {
      // Logique de soumission du paiement ici
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
