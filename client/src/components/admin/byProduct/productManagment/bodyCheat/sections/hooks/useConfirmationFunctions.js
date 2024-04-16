import { useState } from "react";

const useConfirmationFunctions = ({
  handleSubmit,
  addSecondariesImagesToFirebaseStorage,
  deleteSecondariesImagesFromStorage,
}) => {
  const [confirmationEnabled, setConfirmationEnabled] = useState(false);

  const handleValidate = async () => {
    try {
      const paths = await addSecondariesImagesToFirebaseStorage();
      handleSubmit("create", paths);
    } catch (error) {
      console.log("error dans button valider :", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const pathsToAdd = await addSecondariesImagesToFirebaseStorage();
      const pathsToDelete = await deleteSecondariesImagesFromStorage();
      const paths = pathsToAdd.filter((path) => !pathsToDelete.includes(path));
      handleSubmit("edit", paths);
    } catch (error) {
      console.log("error dans button enregistrer les modifications :", error);
    }
  };

  const handleDeleteProduct = () => {
    handleSubmit("delete");
  };
 
  return {
    confirmationEnabled,
    setConfirmationEnabled,
    handleValidate,
    handleSaveChanges,
    handleDeleteProduct,
  };
};

export default useConfirmationFunctions;
