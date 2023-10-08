import React, { useEffect, useRef, useState } from "react";
import bo from "../../assets/bo.png";
import bra from "../../assets/bra.png";
import bar from "../../assets/bar.png";
import col from "../../assets/col.png";

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const images = [bo, bra, bar, col];
  const maxZoomLevel = 2;
  const mainImageRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
    setZoomLevel(1);
  };

  const handleImageClick = () => {
    if (zoomLevel < maxZoomLevel) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.2);
    } else {
      setZoomLevel(1);
    }
  };

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

  return (
    <div className="image-carousel-container">
      <div
        className="main-image-container"
        onClick={handleImageClick}
        ref={mainImageRef}
      >
        <img
          src={images[currentImage]}
          alt=""
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
