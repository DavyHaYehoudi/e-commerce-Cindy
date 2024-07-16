import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateFilePath } from "../../../../../../helpers/utils/generateFilePath";
import { storage } from "../../../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { updateIllustration } from "../../../../../../features/admin/categorySlice";

const useIllustrationEdit = ({
  categoryId,
  setAddIllustrationToStorage,
  setRemoveIllustrationToStorage,
}) => {
  const categoriesStore = useSelector((state) => state?.category?.data);
  const initIllustration = categoriesStore.find(
    (category) => category?._id === categoryId
  )?.main_image;
  const [mainImageEdit, setMainImageEdit] = useState(initIllustration);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleIllustrationEditChange = async (e) => {
    if (mainImageEdit && !mainImageEdit?.name) {
      setRemoveIllustrationToStorage(mainImageEdit);
    }
    const file = e.target.files[0];
    setMainImageEdit(file);
    const path = generateFilePath(file, "categories/");
    setAddIllustrationToStorage({ file, path });
    dispatch(updateIllustration(path));
  };
  useEffect(() => {
    if (initIllustration && initIllustration.startsWith("categories")) {
      const fetchImagesFromStorage = async () => {
        try {
          setLoading(true);
          const url = await getDownloadURL(ref(storage, initIllustration));
          setMainImageEdit(url);
          setLoading(false);
          dispatch(updateIllustration(initIllustration));
        } catch (error) {
          console.error(
            "Erreur lors du chargement de l'image principale depuis Firebase Storage :",
            error
          );
          setLoading(false);
        }
      };

      fetchImagesFromStorage();
    }
  }, [initIllustration, dispatch]);

  return {
    mainImageEdit,
    handleIllustrationEditChange,
    loading,
  };
};
export default useIllustrationEdit;
