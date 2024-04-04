import { useState } from "react";
import { toast } from "react-toastify";
import { customFetch } from "../../../../../services/customFetch";
import useFormFields from "../bodyCheat/hooks/useFormFields";
import useTagManagement from "../bodyCheat/hooks/useTagManagment";
import useImageManagement from "../bodyCheat/hooks/useImageManagment";
import useMaterialDataManagement from "./useMaterialDataManagement";

const useSubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetFields } = useFormFields({
    name: "",
    collection: "",
    category: "",
    description: "",
  });
  const { resetTags } = useTagManagement();
  const { resetImages } = useImageManagement();
  const { resetMaterials } = useMaterialDataManagement();
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const responseData = await customFetch("products", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      resetFields();
      resetTags();
    //   resetImages();
    //   resetMaterials();

      toast.success(`Le produit a été créé avec succès !`);
      console.log("Réponse de l'API:", responseData);
    } catch (error) {
      toast.error(`Une erreur s'est produite avec l'envoi des données`);
      console.error("Erreur lors de l'envoi des données à l'API:", error);
    } finally {
      setIsSubmitting(false);
    }
    console.log("formData :", formData);
  };

  return { handleSubmit, isSubmitting };
};

export default useSubmitForm;
