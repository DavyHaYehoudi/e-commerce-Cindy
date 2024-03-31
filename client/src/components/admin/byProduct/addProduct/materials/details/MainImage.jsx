import React from "react";
import useImageManagement from "../../hooks/useImageManagment";

const MainImage = () => {
  const { images, handleMainImageUpload } = useImageManagement(1);
//   console.log('images:', images)

  return (
    <div className="main-image">
      <figure>
        <div className="images-wrapper">
          <label htmlFor="file-upload">
            <div className="image-container main_image">
              {images[0] ? (
                <img src={images[0]} alt="Uploaded" />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={(e) => handleMainImageUpload(e, 0)}
              />
            </div>
          </label>
        </div>
        <figcaption>Image principale</figcaption>
      </figure>
    </div>
  );
};

export default MainImage;
