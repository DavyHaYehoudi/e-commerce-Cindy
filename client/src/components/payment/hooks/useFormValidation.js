import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAndBillingAddresses } from "../../../features/accountClient/customerSlice";

const requiredFields = {
  delivery: [
    "firstname",
    "lastname",
    "address",
    "postal-code",
    "city",
    "emailRecipient",
    "phone",
  ],
  billing: [
    "billingFirstName",
    "billingLastName",
    "billingAddress",
    "billingPostalCode",
    "billingCity",
    "billingEmail",
  ],
};
const useFormValidation = () => {
  const [selectedValue, setSelectedValue] = useState("france");
  const advantages = useSelector((state) => state?.product?.advantages);
  const dispatch = useDispatch();
  const { shippingAddress = {}, billingAddress = {} } =
    useSelector((state) => state?.customer?.data?.client) || {};

  const [formData, setFormData] = useState({
    delivery: {
      firstname: shippingAddress.firstName || "",
      lastname: shippingAddress.lastName || "",
      address: shippingAddress.street || "",
      "postal-code": shippingAddress.postalCode || "",
      city: shippingAddress.city || "",
      emailRecipient: shippingAddress.email || "",
      phone: shippingAddress.phone || "",
    },
    billing: {
      billingCompanyName: billingAddress.companyName || "",
      billingFirstName: billingAddress.firstName || "",
      billingLastName: billingAddress.lastName || "",
      billingAddress: billingAddress.street || "",
      billingPostalCode: billingAddress.postalCode || "",
      billingCity: billingAddress.city || "",
      billingEmail: billingAddress.email || "",
      billingPhone: billingAddress.phone || "",
    },
    card: {},
    rememberMe: true,
    isBillingSameAddress: true,
    advantages,
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      delivery: {
        firstname: shippingAddress.firstName || "",
        lastname: shippingAddress.lastName || "",
        address: shippingAddress.street || "",
        "postal-code": shippingAddress.postalCode || "",
        city: shippingAddress.city || "",
        emailRecipient: shippingAddress.email || "",
        phone: shippingAddress.phone || "",
      },
      billing: {
        billingCompanyName: billingAddress.companyName || "",
        billingFirstName: billingAddress.firstName || "",
        billingLastName: billingAddress.lastName || "",
        billingAddress: billingAddress.street || "",
        billingPostalCode: billingAddress.postalCode || "",
        billingCity: billingAddress.city || "",
        billingEmail: billingAddress.email || "",
        billingPhone: billingAddress.phone || "",
      },
    }));
  }, [shippingAddress, billingAddress]);

  const [validationErrors, setValidationErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const handleShippingAndBilling = ({ e, property, field, section }) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [name]: value },
    }));
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
  const handleSubmit = async () => {
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
    // if (Object.keys(errors).length === 0) {
    //   navigate("/cart/payment");
    // }
  };
  useEffect(() => {
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
  }, [formData]);

  return {
    formData,
    shippingAddress,
    billingAddress,
    validationErrors,
    validFields,
    handleShippingAndBilling,
    handleCheckboxChange,
    handleSubmit,
    clearValidationError,
    selectedValue,
    handleSelectChange,
  };
};

export default useFormValidation;
