import { useDispatch } from "react-redux";
import useUnauthorizedRedirect from "../../../../../services/errors/useUnauthorizedRedirect";
import { updateCollection } from "../../../../../features/admin/collectionSlice";
import { updateCategory } from "../../../../../features/admin/categorySlice";
import { updateMaterial } from "../../../../../features/admin/materialSlice";

const useRestoreItem = () => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleRestore = (id, parameter) => {
    let formData = { isArchived: false };
    switch (parameter) {
      case "collection":
        dispatch(
          updateCollection({
            collectionId: id,
            formData,
            restore: true,
            handleUnauthorized,
          })
        );
        break;
      case "category":
        dispatch(
          updateCategory({
            categoryId: id,
            formData,
            restore: true,
            handleUnauthorized,
          })
        );
        break;
      case "material":
        formData = { isArchived: false, restore: true };
        dispatch(
          updateMaterial({
            materialId: id,
            formData,
            restore: true,
            handleUnauthorized,
          })
        );
        break;
      default:
        console.log("Erreur dans le switch de handleRestore");
    }
  };

  return handleRestore;
};

export default useRestoreItem;
