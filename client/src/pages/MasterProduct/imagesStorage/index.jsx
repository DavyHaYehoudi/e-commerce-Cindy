import React from "react";
import ThumbnailContainer from "./ThumbnailContainer";
import useImageCarousel from "./hooks/useImageCarousel";
import { TfiClose } from "react-icons/tfi";

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
    handleCloseClick,
  } = useImageCarousel(mainImage, secondaryImages, handleMaterialSelected);

  return (
    <div className="image-carousel-container">
      <div
        className="main-image-container"
        onClick={() => handleImageClick(3)}
        ref={mainImageRef}
      >
        <div
          className="image-wrapper"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={imageUrl}
            alt=""
            className={zoomLevel > 1 ? "mainImage-zooming" : ""}
          />
          {zoomLevel > 1 && (
            <button
              onClick={handleCloseClick}
              aria-label="Dézoomer l'image'"
              className="mainImage-zooming-close"
            >
              <TfiClose aria-hidden="true" />
            </button>
          )}
        </div>
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
