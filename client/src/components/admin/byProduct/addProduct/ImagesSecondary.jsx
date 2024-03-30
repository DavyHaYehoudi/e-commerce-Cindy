import React from "react";

const ImagesSecondary = ({ imagesSecondary, handleChangeImagesSecondary }) => {
  return (
    <div className="images-secondary-section">
      <p>Images secondaires :</p>
      <div className="images-secondary-wrapper">
        {imagesSecondary.map((image, index) => (
          <label key={index} htmlFor={`file-upload-${index}`}>
            <div className="image-container">
              {image ? (
                <img src={image} alt={`${index + 1}`} />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                id={`file-upload-${index}`}
                accept="image/*"
                onChange={(e) => handleChangeImagesSecondary(e, index)}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ImagesSecondary;
