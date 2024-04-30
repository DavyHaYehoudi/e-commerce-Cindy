import { useState } from "react";
import { customFetch } from "../../services/customFetch";
import { toast } from "react-toastify";

const useProfilChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleChangeProfilSave = async (editedUserData, clientId) => {
    setLoading(true);
    if (!isModified) {
      setIsEditing(false);
      return toast.info("Aucune modification n'a été apportée.");
    }
    try {
      const response = await customFetch(`clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserData),
      });

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

  return {
    loading,
    error,
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    isModified,
    setIsModified,
  };
};

export default useProfilChange;
