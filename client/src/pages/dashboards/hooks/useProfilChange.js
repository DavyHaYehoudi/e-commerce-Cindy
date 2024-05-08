import { useState } from "react";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/useUnauthorizedRedirect";
import { Patch } from "../../../services/httpMethods";

const useProfilChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleUnauthorized = useUnauthorizedRedirect();
  const handleChangeProfilSave = async (editedUserData, clientId) => {
    setLoading(true);
    if (!isModified) {
      setIsEditing(false);
      return toast.info("Aucune modification n'a été apportée.");
    }
    try {
      const response = await Patch(
        `clients/${clientId}`,
        editedUserData,
        null,
        handleUnauthorized
      );

      if (response) {
        toast.success(
          "Les modifications de votre profil ont bien été enregistrées !"
        );
        setIsEditing(false);
      }
    } catch (error) {
      if (error.message.includes("Status: 400")) {
        toast.error("Une erreur est survenue avec les informations fournies.");
      }
      if (error.message.includes("Status: 500")) {
        toast.error(
          "Une erreur est survenue avec les données saisies ou le réseau."
        );
      }
      setError(error.message);
    } finally {
      setLoading(false);
      setIsModified(false);
    }
  };
  const handleChangeProfilEdit = () => {
    setIsEditing(true);
  };

  return {
    loading,
    error,
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    isModified,
    setIsModified,
    handleChangeProfilEdit,
  };
};

export default useProfilChange;
