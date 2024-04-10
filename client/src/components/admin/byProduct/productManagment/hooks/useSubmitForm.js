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
  handleCloseModal
}) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const statusStore =useSelector(state=>state?.product?.status)
  const materialBeforeEditing = productsStore?.find(
    (product) => product?._id === currentProductId
  )?.materials;
  const dispatch = useDispatch();

  if (materialsData.length === 0) {
    materialsData = materialBeforeEditing;
  }
  const formData = {
    name: fields?.name,
    _collection: fields?.collection,
    category: fields?.category,
    tags: tags?.map((tag) => tag?._id),
    // secondary_images: images,
    main_description: fields?.description,
    materials: formatMaterialProduct(materialsData),
  };
  const isSucceed = statusStore==="succeeded"
  const handleSubmit = async (currentAction,paths) => {
    if (currentAction === "create") {
      formData.secondary_images = paths
      dispatch(addProduct(formData));
      if(isSucceed){handleCloseModal()}
    }
    if (currentAction === "edit") {
      formData.secondary_images = paths
      dispatch(editProduct({ formData, productId: currentProductId }));
      if(isSucceed){handleCloseModal()}
    }
    if (currentAction === "delete") {
      const confirm = window.confirm(
        "Etes-vous sûr de vouloir supprimer ce produit, cette action est définitive ?"
      );
      if (confirm) {
        dispatch(deleteProduct(currentProductId));
        if(isSucceed){handleCloseModal()}
      } else if (!confirm) {
        return;
      }
    }
  };
  // console.log("formData :", formData);

  return { handleSubmit };
};

export default useSubmitForm;
