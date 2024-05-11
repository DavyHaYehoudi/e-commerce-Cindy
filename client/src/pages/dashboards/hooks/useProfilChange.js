import { useState } from "react";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Patch } from "../../../services/httpMethods";
import { handleFetchError } from "../../../services/errors/handleFetchError";

const useProfilChange = () => {
  const [loading, setLoading] = useState(false);
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
      await Patch(
        `clients/${clientId}`,
        editedUserData,
        null,
        handleUnauthorized
      );
      toast.success(
        "Les modifications de votre profil ont bien été enregistrées !"
      );
      setIsEditing(false);
    } catch (error) {
      handleFetchError(error);
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
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    isModified,
    setIsModified,
    handleChangeProfilEdit,
  };
};

export default useProfilChange;
