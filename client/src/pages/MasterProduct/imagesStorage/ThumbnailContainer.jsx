import React from "react";
import Thumbnails from "./Thumbnails";

const ThumbnailContainer = ({ images, handleThumbnailClick }) => {
  return (
    <div className="thumbnail-container">
      {images &&
        images.length > 0 &&
        images.map((imagePath, index) => (
          <Thumbnails
            key={index}
            imagePath={imagePath}
            index={index}
            handleThumbnailClick={handleThumbnailClick}
          />
        ))}
    </div>
  );
};

export default ThumbnailContainer;
