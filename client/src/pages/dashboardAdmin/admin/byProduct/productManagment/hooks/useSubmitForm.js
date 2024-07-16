import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  changeProductActiveStatus,
  deleteProduct,
  editProduct,
  modifyProductCheet,
  resetProductMaterials,
  resetStore,
} from "../../../../../../features/admin/productSlice";
import formatMaterialProduct from "../../utils/formatMaterialProduct";
import { Get } from "../../../../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../../../../services/errors/useUnauthorizedRedirect";
import { useState } from "react";

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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const productsStore = useSelector((state) => state?.product?.data);
  const isProductActive = productsStore.find(
    (product) => product?._id === currentProductId
  )?.isActive;

  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const materialBeforeEditing = productsStore?.find(
    (product) => product?._id === currentProductId
  )?.materials;
  if (materialsData.length === 0) {
    materialsData = materialBeforeEditing;
  }
  const isPendingProduct = useSelector(
    (state) => state?.product?.isPendingProduct
  );
  const handleSwitchChange = (isChecked) => {
    dispatch(
      changeProductActiveStatus({
        productId: currentProductId,
        status: isChecked,
        isPending: !isPendingProduct,
      })
    );
    dispatch(modifyProductCheet(true));
  };

  const formData = {
    name: fields?.name,
    _collection: fields?.collection,
    category: fields?.category,
    type: fields?.type,
    tags: tags?.map((tag) => tag?._id),
    main_description: fields?.description,
    materials: formatMaterialProduct(materialsData),
    isActive: isProductActive,
  };

  const handleSubmit = async (currentAction, paths) => {
    setLoadingSubmit(true);
    const handleCreateProduct = async () => {
      try {
        await Get("auth/verify-token/admin");
        formData.secondary_images = paths;
        await uploadMainImagesToStorage();
        dispatch(addProduct({ formData, handleUnauthorized }));
        reset();
        handleCloseModal();
        setLoadingSubmit(false);
        dispatch(
          changeProductActiveStatus({
            productId: currentProductId,
            status: "",
            isPending: false,
          })
        );
      } catch (error) {
        dispatch(resetProductMaterials());
        dispatch(modifyProductCheet(false));
        setLoadingSubmit(false);
      }
      setLoadingSubmit(false);
    };

    const handleEditProduct = async () => {
      try {
        await Get("auth/verify-token/admin", null, handleUnauthorized);
        formData.secondary_images = paths;
        await uploadMainImagesToStorage();
        await deleteMainImagesFromStorage();
        dispatch(
          editProduct({
            formData,
            productId: currentProductId,
            handleUnauthorized,
          })
        );
        reset();
        handleCloseModal();
      } catch (error) {
        dispatch(resetProductMaterials());
        dispatch(modifyProductCheet(false));
        dispatch(resetStore());
      }
    };

    const handleDeleteProduct = async () => {
      const confirmDelete = window.confirm(
        "Etes-vous sûr de vouloir supprimer ce produit, cette action est définitive ?"
      );
      if (confirmDelete) {
        try {
          await Get("auth/verify-token/admin", null, handleUnauthorized);
          await deleteAllMainImagesFromStorage(data);
          await deleteAllSecondariesImagesFromStorage();
          dispatch(
            deleteProduct({ productId: currentProductId, handleUnauthorized })
          );
          reset();
          handleCloseModal();
        } catch (error) {
          dispatch(resetProductMaterials());
          dispatch(modifyProductCheet(false));
          dispatch(resetStore());
        }
      }
      setLoadingSubmit(false);
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

  return {
    handleSubmit,
    handleSwitchChange,
    isProductActive,
    loadingSubmit,
    isPendingProduct,
  };
};

export default useSubmitForm;
