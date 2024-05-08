import { useState } from "react";
import { customFetch } from "../../../services/customFetch";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import useUnauthorizedRedirect from "../../../services/useUnauthorizedRedirect";

const useProfilChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // const navigate = useNavigate();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleChangeProfilSave = async (editedUserData, clientId) => {
    setLoading(true);
    if (!isModified) {
      setIsEditing(false);
      return toast.info("Aucune modification n'a été apportée.");
    }
    try {
      const response = await customFetch(
        `clients/${clientId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editedUserData),
        },
        // () => {
        //   navigate("/account/login");
        // }
        handleUnauthorized()
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
