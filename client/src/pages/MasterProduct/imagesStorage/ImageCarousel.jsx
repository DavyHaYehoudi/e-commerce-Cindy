import React from "react";
import ThumbnailContainer from "./ThumbnailContainer";
import useImageCarousel from "./hooks/useImageCarousel";

const ImageCarousel = ({
  mainImage,
  secondaryImages,
  handleMaterialSelected,
}) => {
  const {
    imageUrl,
    zoomLevel,
    mainImageRef,
    handleThumbnailClick,
    handleImageClick,
  } = useImageCarousel(mainImage, secondaryImages, handleMaterialSelected);

  return (
    <div className="image-carousel-container">
      <div
        className="main-image-container"
        onClick={handleImageClick}
        ref={mainImageRef}
      >
        <img
          src={imageUrl}
          alt=""
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
      <div className="thumbnail-container">
        <div>
          <ThumbnailContainer
            images={secondaryImages}
            handleThumbnailClick={handleThumbnailClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
