import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateClientField } from "../../../../features/accountClient/customerSlice";
import { storage } from "../../../../firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { Get } from "../../../../services/httpMethods";
import { validateMainFields } from "../utils/validateMainFields";
import { errorMessagesContent } from "../utils/errorMessagesContent";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useInfoClient = (
  dataClient,
  setIsModified,
  handleChangeProfilSave,
  clientId,
  addAvatarToStorage,
  setAddAvatarToStorage,
  removeAvatarToStorage,
  setRemoveAvatarToStorage
) => {
  const [profileFields, setProfileFields] = useState([]);
  const [shippingFields, setShippingFields] = useState([]);
  const [billingFields, setBillingFields] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const dispatch = useDispatch();
  const avatarStore = useSelector((state) => state?.customer?.avatar);
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleInputChange =
    (fieldName, nestedFieldName = null, label) =>
    (e) => {
      const { name, value } = e.target;
      // Vérifier si le champ appartient aux champs de profil
      const isProfileField =
        ["firstName", "lastName", "email"].includes(fieldName) &&
        !nestedFieldName;

      // Appliquer la validation uniquement pour les champs de profil
      const isValid = isProfileField ? validateMainFields(name, value) : true;

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

  useEffect(() => {
    setHasErrors(errorMessagesContent(errorMessages));
  }, [errorMessages]);

  const handleSaveChanges = async () => {
    if (!hasErrors) {
      const formatDataClient = { ...dataClient };
      formatDataClient.avatar = avatarStore;
      await handleChangeProfilSave(formatDataClient, clientId);

      try {
        // Vérifier le token avant d'interagir avec Firebase Storage
        await Get("auth/verify-token/client", null, handleUnauthorized);
        if (addAvatarToStorage) {
          const { path, file } = addAvatarToStorage;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          //Pour relancer le useEffect sur initAvatar dans useProfilClientImage et que mainImage soit issue de firebase Storage et non en local
          dispatch(updateClientField({ fieldName: "avatar", value: path }));
          console.log("Image avatar envoyée avec succès !");
        }
        if (removeAvatarToStorage) {
          const imageUrl = removeAvatarToStorage;
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log("Image avatar supprimée avec succès !");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'image avatar dans firebase storage :",
          error
        );
      } finally {
        setAddAvatarToStorage(null);
        setRemoveAvatarToStorage(null);
      }
    }
  };

  return {
    profileFields,
    shippingFields,
    billingFields,
    handleInputChange,
    errorMessages,
    hasErrors,
    handleSaveChanges,
  };
};

export default useInfoClient;
