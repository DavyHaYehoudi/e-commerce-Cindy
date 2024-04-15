import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../../../../../features/admin/productSlice";
import formatMaterialProduct from "../../../../../helpers/utils/products/formatMaterialProduct";

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
  data
}) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const statusStore = useSelector((state) => state?.product?.status);
  const materialBeforeEditing = productsStore?.find(
    (product) => product?._id === currentProductId
  )?.materials;
  const productMaterials = useSelector((state) => state?.product?.materials);
  const dispatch = useDispatch();

  if (materialsData.length === 0) {
    materialsData = materialBeforeEditing;
  }
  const formData = {
    name: fields?.name,
    _collection: fields?.collection,
    category: fields?.category,
    tags: tags?.map((tag) => tag?._id),
    main_description: fields?.description,
    materials: formatMaterialProduct(productMaterials),
  };
  const isSucceed = statusStore === "succeeded";
  const handleSubmit = async (currentAction, paths) => {
    if (currentAction === "create") {
      formData.secondary_images = paths;
      await uploadMainImagesToStorage();
      dispatch(addProduct(formData));
      reset();
      if (isSucceed) {
        handleCloseModal();
      }
    }
    if (currentAction === "edit") {
      formData.secondary_images = paths;
      await uploadMainImagesToStorage();
      await deleteMainImagesFromStorage();
      dispatch(editProduct({ formData, productId: currentProductId }));
      reset();
      if (isSucceed) {
        handleCloseModal();
      }
    }
    if (currentAction === "delete") {
      const confirm = window.confirm(
        "Etes-vous sûr de vouloir supprimer ce produit, cette action est définitive ?"
      );
      if (confirm) {
        await deleteAllMainImagesFromStorage(data);
        await deleteAllSecondariesImagesFromStorage();
        dispatch(deleteProduct(currentProductId));
        reset();
        if (isSucceed) {
          handleCloseModal();
        }
      } else if (!confirm) {
        return;
      }
    }
  };

  return { handleSubmit };
};

export default useSubmitForm;
