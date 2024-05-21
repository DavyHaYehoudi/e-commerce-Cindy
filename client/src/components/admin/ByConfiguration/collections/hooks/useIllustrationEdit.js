import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIllustration } from "../../../../../features/admin/collectionSlice";
import { generateFilePath } from "../../../../../helpers/utils/generateFilePath";
import { storage } from "../../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useIllustrationEdit = ({
  collectionId,
  setAddIllustrationToStorage,
  setRemoveIllustrationToStorage, 
}) => {
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const initIllustration = collectionsStore.find(
    (collection) => collection._id === collectionId
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
    const path = generateFilePath(file, "collections/");
    setAddIllustrationToStorage({ file, path });
    dispatch(updateIllustration(path));
  };
  useEffect(() => {
    if (initIllustration && initIllustration.startsWith("collections")) {
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
