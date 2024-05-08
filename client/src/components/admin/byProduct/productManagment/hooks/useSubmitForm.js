import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../../../../../features/admin/productSlice";
import formatMaterialProduct from "../../utils/formatMaterialProduct";
import { Get } from "../../../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../../../services/useUnauthorizedRedirect";

const useSubmitForm = ({
  fields,
  tags,
  materialsData,
  currentProductId,
  handleCloseModal,
  uploadMainImagesToStorage,
  deleteMainImagesFromStorage,
  deleteAllMainImagesFromStorage,
  deleteAllSecondariesImagesFromStorage,
  reset,
  data,
}) => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const productsStore = useSelector((state) => state?.product?.data);

  const materialBeforeEditing = productsStore?.find(
    (product) => product?._id === currentProductId
  )?.materials;
  if (materialsData.length === 0) {
    materialsData = materialBeforeEditing;
  }

  const formData = {
    name: fields?.name,
    _collection: fields?.collection,
    category: fields?.category,
    tags: tags?.map((tag) => tag?._id),
    main_description: fields?.description,
    materials: formatMaterialProduct(materialsData),
  };

  const handleSubmit = async (currentAction, paths) => {
    const handleCreateProduct = async () => {
      try {
        await Get("auth/verify-token", null, handleUnauthorized);
        formData.secondary_images = paths;
        await uploadMainImagesToStorage();
        dispatch(addProduct(formData));
        reset();
        handleCloseModal();
      } catch (error) {
        console.log("error in handleCreateProduct :", error);
      }
    };

    const handleEditProduct = async () => {
      try {
        await Get("auth/verify-token", null, handleUnauthorized);
        formData.secondary_images = paths;
        await uploadMainImagesToStorage();
        await deleteMainImagesFromStorage();
        dispatch(editProduct({ formData, productId: currentProductId }));
        reset();
        handleCloseModal();
      } catch (error) {
        console.log("error in handleEditProduct :", error);
      }
    };

    const handleDeleteProduct = async () => {
      const confirmDelete = window.confirm(
        "Etes-vous sûr de vouloir supprimer ce produit, cette action est définitive ?"
      );
      if (confirmDelete) {
        try {
          await Get("auth/verify-token", null, handleUnauthorized);
          await deleteAllMainImagesFromStorage(data);
          await deleteAllSecondariesImagesFromStorage();
          dispatch(deleteProduct(currentProductId));
          reset();
          handleCloseModal();
        } catch (error) {
          console.log("error in handleDeleteProduct :", error);
        }
      }
    };

    switch (currentAction) {
      case "create":
        await handleCreateProduct();
        break;
      case "edit":
        await handleEditProduct();
        break;
      case "delete":
        await handleDeleteProduct();
        break;
      default:
        break;
    }
  };

  return { handleSubmit };
};

export default useSubmitForm;
