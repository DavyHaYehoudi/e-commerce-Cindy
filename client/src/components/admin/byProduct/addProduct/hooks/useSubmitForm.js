import { useState } from "react";
import { toast } from "react-toastify";
import { customFetch } from "../../../../../services/customFetch";

const useSubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    // setIsSubmitting(true);
    // try {
    //   // Envoi des données à l'API
    //   const responseData = await customFetch("products", {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //   });
    //   toast.success(`Le produit a été créé avec succès !`);
    //   console.log("Réponse de l'API:", responseData);
    // } catch (error) {
    //   toast.error(`Une erreur s'est produite avec l'envoi des données`);
    //   console.error("Erreur lors de l'envoi des données à l'API:", error);
    // } finally {
    //   setIsSubmitting(false);
    // }
    console.log("formData :", formData);
  };

  return { handleSubmit, isSubmitting };
};

export default useSubmitForm;
