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
        } else {
          if (!valid[section]) valid[section] = {};
          valid[section][field] = true;
        }
      });
    });

    setValidationErrors(errors);
    setValidFields(valid);
  }, [isBillingSameAddress, shippingAddress, billingAddress]);

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
