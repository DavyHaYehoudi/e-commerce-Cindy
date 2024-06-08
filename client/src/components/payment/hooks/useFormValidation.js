import { useState } from "react";

const useFormValidation = () => {
  const [formData, setFormData] = useState({
      delivery: {},
      card: {},
      billing: {},
      rememberMe: true,
    });
    console.log('formData:', formData)
  const [validationErrors, setValidationErrors] = useState({});

  const updateData = (section, data) => {
    setFormData((prevData) => ({ ...prevData, [section]: { ...prevData[section], ...data }, }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      rememberMe: !prevData.rememberMe,
    }));
  };

  const handleSubmit = (requiredFields) => {
    const errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "Ce champ est requis";
      }
    });

    setValidationErrors(errors);

    // Si aucun erreur, procéder au paiement
    if (Object.keys(errors).length === 0) {
      // Logique de soumission du paiement ici
    }
  };

  const clearValidationError = (field) => {
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    formData,
    validationErrors,
    updateData,
    handleCheckboxChange,
    handleSubmit,
    clearValidationError,
  };
};

export default useFormValidation;
