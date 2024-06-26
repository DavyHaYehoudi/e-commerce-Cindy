import { useEffect, useRef, useState } from "react";
import useFirebaseImage from "../../../../shared/hooks/useFirebaseImage";

const useImageCarousel = (
  mainImage,
  secondaryImages,
  handleMaterialSelected
) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const mainImageRef = useRef(null);
  const { imageUrl } = useFirebaseImage(mainImage);

  const handleContainerClick = (e) => {
    if (mainImageRef.current && !mainImageRef.current.contains(e.target)) {
      setZoomLevel(1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleContainerClick);
    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, []);

  const handleThumbnailClick = (index) => {
    handleMaterialSelected({ currentImage: secondaryImages[index] });
    setZoomLevel(1);
  };

  const handleImageClick = (level) => {
    setZoomLevel(level);
  };
  const handleCloseClick = (event) => {
    event.stopPropagation();
    handleImageClick(1);
  };

  return {
    imageUrl,
    zoomLevel,
    mainImageRef,
    handleThumbnailClick,
    handleImageClick,
    handleCloseClick,
  };
};

export default useImageCarousel;
