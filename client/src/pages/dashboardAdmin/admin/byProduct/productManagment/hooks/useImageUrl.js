import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const useImageUrl = (imagePath) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImageUrlFromStorage = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Firebase Storage error:", error);
      }
    };

    if (imagePath && imagePath.startsWith("products/main")) {
      getImageUrlFromStorage();
    } else {
      setImageUrl(imagePath);
    }
  }, [imagePath]);

  return imageUrl;
};

export default useImageUrl;
