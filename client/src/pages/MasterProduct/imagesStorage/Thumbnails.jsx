import React from "react";
import useFirebaseImage from "../../../shared/hooks/useFirebaseImage";

const Thumbnails = ({ imagePath, index, handleThumbnailClick }) => {
  const { imageUrl } = useFirebaseImage(imagePath);

  return (
    <img
      key={index}
      src={imageUrl}
      alt={`Thumbnail ${index + 1}`}
      className="thumbnail"
      width="150px"
      onClick={() => handleThumbnailClick(index)}
    />
  );
};

export default Thumbnails;
