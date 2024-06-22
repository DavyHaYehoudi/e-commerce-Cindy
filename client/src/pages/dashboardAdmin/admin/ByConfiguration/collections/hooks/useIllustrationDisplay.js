import { useEffect, useState } from "react";
import { storage } from "../../../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useIllustrationDisplay = ({ collectionId, collectionsStore }) => {
  const [mainImageDisplay, setMainImageDisplay] = useState();
  const [loading, setLoading] = useState(false);
  const initIllustration = collectionsStore.find(
    (collection) => collection._id === collectionId
  )?.main_image;

  useEffect(() => {
    if (initIllustration && initIllustration.startsWith("collections")) {
      const fetchImagesFromStorage = async () => {
        try {
          setLoading(true);
          const url = await getDownloadURL(ref(storage, initIllustration));
          setMainImageDisplay(url);
          setLoading(false);
        } catch (error) {
          console.error(
            "Erreur lors du chargement de mainImageDisplay collection depuis Firebase Storage :",
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
