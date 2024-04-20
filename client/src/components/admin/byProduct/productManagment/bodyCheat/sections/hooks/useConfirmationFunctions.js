import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useConfirmationFunctions = ({
  handleSubmit,
  addSecondariesImagesToFirebaseStorage,
  deleteSecondariesImagesFromStorage,
  fields,
}) => {
  const [confirmationEnabled, setConfirmationEnabled] = useState(false);
  const productMaterials = useSelector((state) => state?.product?.materials);
  useEffect(() => {
    const validateFields =
      fields?.name && fields?.collection && fields?.category;
    const validateMaterials =
      productMaterials?.length > 0 &&
      productMaterials?.every(
        (material) =>
          material?.main_image &&
          material?.pricing?.currentPrice &&
          material?.stock
      );
    setConfirmationEnabled(validateFields && validateMaterials);
  }, [productMaterials, fields]);

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
