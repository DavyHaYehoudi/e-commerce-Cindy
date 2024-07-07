import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAndBillingAddresses } from "../../../features/accountClient/customerSlice";
import { toggleCheckBilling } from "../../../features/admin/productSlice";

const requiredFields = {
  delivery: [
    "firstName",
    "lastName",
    "street",
    "postalCode",
    "city",
    "email",
    "phone",
  ],
  billing: ["firstName", "lastName", "street", "postalCode", "city", "email"],
};
const useFormValidation = () => {
  const [selectedValue, setSelectedValue] = useState("france");
  const advantages = useSelector((state) => state?.product?.advantages);
  const dispatch = useDispatch();
  const { shippingAddress = {}, billingAddress = {} } =
    useSelector((state) => state?.customer?.data?.client) || {};
  const isBillingSameAddress = useSelector(
    (state) => state?.product?.isBillingSameAddress
  );
  const [formData, setFormData] = useState({
    card: {},
    rememberMe: true,
    advantages,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const handleShippingAndBilling = ({ e, property, field }) => {
    const { value } = e.target;
    dispatch(updateShippingAndBillingAddresses({ property, field, value }));
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleCheckboxChange = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
  };
  const handleToggleBillingCheck = () => {
    dispatch(toggleCheckBilling());
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
  useEffect(() => {
    const errors = {};
    const valid = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.keys(requiredFields).forEach((section) => {
      if (section === "billing" && isBillingSameAddress) {
        return;
      }

      requiredFields[section].forEach((field) => {
        const address =
          section === "delivery" ? shippingAddress : billingAddress;

        if (!address[field]) {
          if (!errors[section]) errors[section] = {};
          errors[section][field] = "Ce champ est requis";
        } else if (field === "email" && !emailRegex.test(address[field])) {
          if (!errors[section]) errors[section] = {};
          errors[section][field] = "Adresse email invalide";
        } else {
          if (!valid[section]) valid[section] = {};
          valid[section][field] = true;
        }
      });
    });
    const errorsString = JSON.stringify(errors);
    const validationErrorsString = JSON.stringify(validationErrors);
    const validFieldsString = JSON.stringify(valid);
    const currentValidFieldsString = JSON.stringify(validFields);

    if (errorsString !== validationErrorsString) {
      setValidationErrors(errors);
    }

    if (validFieldsString !== currentValidFieldsString) {
      setValidFields(valid);
    }
  }, [
    isBillingSameAddress,
    shippingAddress,
    billingAddress,
    validationErrors,
    validFields,
  ]);

  return {
    formData,
    shippingAddress,
    billingAddress,
    validationErrors,
    validFields,
    handleShippingAndBilling,
    handleCheckboxChange,
    clearValidationError,
    selectedValue,
    handleSelectChange,
    handleToggleBillingCheck,
    isBillingSameAddress,
  };
};

export default useFormValidation;
