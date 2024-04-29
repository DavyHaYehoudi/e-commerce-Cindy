import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateClientField } from "../../../../features/accountClient/customerSlice";

const useInfoClient = (
  dataClient,
  setIsModified,
  handleChangeProfilSave,
  clientId
) => {
  const [profileFields, setProfileFields] = useState([]);
  const [shippingFields, setShippingFields] = useState([]);
  const [billingFields, setBillingFields] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (fieldName, value) => {
    if (fieldName === "email") {
      return emailRegex.test(value);
    } else {
      return value.trim() !== "";
    }
  };

  const handleInputChange =
    (fieldName, nestedFieldName = null, label) =>
    (e) => {
      const { name, value } = e.target;
      const isValid = validateField(name, value);

      if (!isValid) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: `Le champ ${label} est requis.`,
        }));
      } else if (errorMessages[name]) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }
      const actionPayload = nestedFieldName
        ? { fieldName, nestedFieldName, value }
        : { fieldName, value };

      dispatch(updateClientField(actionPayload));
      setIsModified(true);
    };

  useEffect(() => {
    if (!dataClient) return;

    const {
      firstName,
      lastName,
      phone,
      email,
      shippingAddress,
      billingAddress,
    } = dataClient;

    const profileFields = [
      { label: "Prénom", name: "firstName", value: firstName, required: true },
      { label: "Nom", name: "lastName", value: lastName, required: true },
      { label: "Email", name: "email", value: email, required: true },
      { label: "Téléphone", name: "phone", value: phone },
    ];

    const shippingFields = mapAddressFields(shippingAddress, "shippingAddress");
    const billingFields = mapAddressFields(billingAddress, "billingAddress");

    setProfileFields(profileFields);
    setShippingFields(shippingFields);
    setBillingFields(billingFields);
  }, [dataClient, dispatch]);

  const mapAddressFields = (address, nestedFieldName) => {
    if (!address) return [];

    const {
      firstName,
      lastName,
      street,
      postalCode,
      city,
      country,
      phone,
      email,
    } = address;

    return [
      { label: "Prénom", name: "firstName", value: firstName, nestedFieldName },
      { label: "Nom", name: "lastName", value: lastName, nestedFieldName },
      { label: "Voie", name: "street", value: street, nestedFieldName },
      {
        label: "Code Postal",
        name: "postalCode",
        value: postalCode,
        nestedFieldName,
      },
      { label: "Ville", name: "city", value: city, nestedFieldName },
      { label: "Pays", name: "country", value: country, nestedFieldName },
      { label: "Téléphone", name: "phone", value: phone, nestedFieldName },
      { label: "Email", name: "email", value: email, nestedFieldName },
    ];
  };

  const handleSaveChanges = () => {
    // Vérifier s'il y a des erreurs avant de sauvegarder les modifications
    const hasErrors = Object.values(errorMessages).some(
      (message) => message !== null
    );
    if (!hasErrors) {
      handleChangeProfilSave(dataClient, clientId);
    }
  };

  return {
    profileFields,
    shippingFields,
    billingFields,
    handleInputChange,
    errorMessages,
    handleSaveChanges,
  };
};

export default useInfoClient;
