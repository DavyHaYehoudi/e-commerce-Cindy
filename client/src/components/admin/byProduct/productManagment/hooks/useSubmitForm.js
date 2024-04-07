import { useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../../../../../features/admin/productSlice";
import formatMaterialProduct from "../../../../../helpers/utils/products/formatMaterialProduct";

const useSubmitForm = ({
  handleCloseModal,
  fields,
  tags,
  materialsData,
  images,
  currentProductId,
}) => {
  const dispatch = useDispatch();
  const formData = {
    name: fields?.name,
    _collection: fields?.collection,
    category: fields?.category,
    tags: tags?.map((tag) => tag?._id),
    secondary_images: images,
    main_description: fields?.description,
    materials: formatMaterialProduct(materialsData),
  };
  const handleSubmit = async (currentAction) => {
    if (currentAction === "create") {
      dispatch(addProduct(formData));
    }
    if (currentAction === "edit") {
      dispatch(editProduct({ formData, productId: currentProductId }));
    }
    if (currentAction === "delete") {
      const confirm = window.confirm(
        "Etes-vous sûr de vouloir supprimer ce produit, cette action est définitive ?"
      ); 
      if (confirm) {
        dispatch(deleteProduct(currentProductId));
      } else if (!confirm) {
        return;
      }
    }

    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };
  // console.log("formData :", formData);

  return { handleSubmit };
};

export default useSubmitForm;
