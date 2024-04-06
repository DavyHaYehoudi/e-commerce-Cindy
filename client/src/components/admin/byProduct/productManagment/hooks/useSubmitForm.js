import { useDispatch } from "react-redux";
import { addProduct } from "../../../../../features/admin/productSlice";
import formatMaterialProduct from "../../../../../helpers/utils/products/formatMaterialProduct";

const useSubmitForm = (
  handleCloseModal,
  fields,
  tags,
  materialsData,
  images
) => {
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
  const handleSubmit = async () => {
    dispatch(addProduct(formData));
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };
  // console.log("formData :", formData);

  return { handleSubmit };
};

export default useSubmitForm;
