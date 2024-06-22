import { useState, useEffect } from "react";
import useFirebaseImage from "./useFirebaseImage";
import { useSelector } from "react-redux";

const useCardProduct = (mainImage, secondaryImages, material) => {
  const { imageUrl: mainImageUrl } = useFirebaseImage(mainImage);
  const [secondaryImageUrl, setSecondaryImageUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(mainImageUrl);

  const materialsStore = useSelector((state) => state?.material?.data);
  const materialName =
    materialsStore.find((mat) => mat?._id === material?._id)?.name || "";

  useEffect(() => {
    setCurrentImage(mainImageUrl);
  }, [mainImageUrl]);

  const handleMouseEnter = () => {
    if (randomImageUrl) {
      setCurrentImage(randomImageUrl);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(mainImageUrl);
  };

  useEffect(() => {
    if (secondaryImages && secondaryImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * secondaryImages.length);
      setSecondaryImageUrl(secondaryImages[randomIndex]);
    } else {
      setSecondaryImageUrl(mainImageUrl);
    }
  }, [secondaryImages, mainImageUrl]);

  const { imageUrl: randomImageUrl } = useFirebaseImage(secondaryImageUrl);

  return {
    currentImage,
    handleMouseEnter,
    handleMouseLeave,
    mainImageUrl,
    randomImageUrl,
    materialsStore,
    materialName,
  };
};

export default useCardProduct;
