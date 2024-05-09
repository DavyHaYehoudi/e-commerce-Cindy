import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validateMaterialsFields from "../utils.js/validateMaterialsFields";
import { Get } from "../../../../../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../../../../../services/errors/useUnauthorizedRedirect";

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
  const handleUnauthorized = useUnauthorizedRedirect();
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
      await Get("auth/verify-token/admin", null, handleUnauthorized);
      const paths = await addSecondariesImagesToFirebaseStorage();
      handleSubmit("create", paths);
    } catch (error) {
      console.log("error dans button valider :", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await Get("auth/verify-token/admin", null, handleUnauthorized);
      const pathsToAdd = await addSecondariesImagesToFirebaseStorage();
      const pathsToDelete = await deleteSecondariesImagesFromStorage();
      const paths = pathsToAdd.filter((path) => !pathsToDelete.includes(path));
      handleSubmit("edit", paths);
    } catch (error) {
      console.log("error dans button enregistrer les modifications :", error);
    }
  };

  const handleDeleteProduct = async () => {
    await Get("auth/verify-token/admin", null, handleUnauthorized);
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
