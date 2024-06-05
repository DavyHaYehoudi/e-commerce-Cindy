import { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useFirebaseImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imagePath) {
      const imageRef = ref(storage, imagePath);

      getDownloadURL(imageRef)
        .then((url) => { 
          setImageUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [imagePath]);

  return { imageUrl, loading, error };
};

export default useFirebaseImage;
