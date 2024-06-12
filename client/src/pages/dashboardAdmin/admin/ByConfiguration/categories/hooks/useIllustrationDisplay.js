import { useEffect, useState } from "react";
import { storage } from "../../../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useIllustrationDisplay = ({ categoryId, categoriesStore }) => {
  const [mainImageDisplay, setMainImageDisplay] = useState();
  const [loading, setLoading] = useState(false);
  const initIllustration = categoriesStore.find(
    (category) => category._id === categoryId
  )?.main_image;

  useEffect(() => {
    if (initIllustration && initIllustration.startsWith("categories")) {
      const fetchImagesFromStorage = async () => {
        try {
          setLoading(true);
          const url = await getDownloadURL(ref(storage, initIllustration));
          setMainImageDisplay(url);
          setLoading(false);
        } catch (error) {
          console.error(
            "Erreur lors du chargement de mainImageDisplay catégorie depuis Firebase Storage :",
            error
          );
          setLoading(false);
        }
      };

      fetchImagesFromStorage();
    }
  }, [initIllustration]);

  return {
    mainImageDisplay,
    loading,
  };
};
export default useIllustrationDisplay;
