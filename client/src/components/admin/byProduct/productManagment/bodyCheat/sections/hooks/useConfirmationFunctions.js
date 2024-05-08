import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validateMaterialsFields from "../utils.js/validateMaterialsFields";

const useConfirmationFunctions = ({
  handleSubmit,
  addSecondariesImagesToFirebaseStorage,
  deleteSecondariesImagesFromStorage,
  fields,
}) => {
  const [confirmationEnabled, setConfirmationEnabled] = useState(false);
  const productMaterials = useSelector((state) => state?.product?.materials);
  const isProductModified = useSelector(
    (state) => state?.product?.isProductCheetModified
  );
  useEffect(() => {
    const validateFields =
      fields?.name && fields?.collection && fields?.category;
    const validateMaterials = validateMaterialsFields(productMaterials);
    setConfirmationEnabled(
      validateFields && validateMaterials && isProductModified
    );
  }, [productMaterials, fields, isProductModified]);

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
