import { toast } from "react-toastify";
import { customFetch } from "../../../../../services/customFetch";

const useSubmitForm = (handleCloseModal) => {
  const handleSubmit = async (formData) => {
    try {
      const responseData = await customFetch("products", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success(`Le produit a été créé avec succès !`);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
      console.log("Réponse de l'API:", responseData);
    } catch (error) {
      toast.error(`Une erreur s'est produite avec l'envoi des données`);
      console.error("Erreur lors de l'envoi des données à l'API:", error);
    } finally {
    }
    console.log("formData :", formData);
  };

  return { handleSubmit };
};

export default useSubmitForm;
