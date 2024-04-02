import React from "react";

const MainImage = ({ mainImage, handleMainImageChange, fileInputId }) => {
  return (
    <div className="main-image">
      <figure>
        <div className="images-wrapper">
          <label htmlFor={fileInputId}>
            <div className="image-container main_image">
              {mainImage ? (
                <img src={mainImage} alt="Uploaded" />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                id={fileInputId}
                accept="image/*"
                onChange={(e) => handleMainImageChange(e)}
              />
            </div>
          </label>
        </div>
        <figcaption>Image principale*</figcaption>
      </figure>
    </div>
  );
};

export default MainImage;
