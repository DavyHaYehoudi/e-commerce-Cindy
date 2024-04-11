import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
const ImagesSecondary = ({
  localImages,
  handleChangeImage,
  handleDeleteImage,
  loading,
}) => {
  const renderFileInputs = () => {
    return localImages.map((image, index) => (
      <label key={index} htmlFor={`file-upload-${index}`}>
        <div className="image-container secondary_image">
          {loading ? (
            <div className="loader">
              <MoonLoader color="var(--dark)" />
            </div>
          ) : image ? (
            typeof image === "string" ? (
              <img src={image} alt="Chargement1..." />
            ) : (
              <>
                <img src={URL.createObjectURL(image)} alt="Chargement2..." />
              </>
            )
          ) : (
            <span>+</span>
          )}

          <input
            type="file"
            id={`file-upload-${index}`}
            accept="image/*"
            onChange={(e) => handleChangeImage(e, index)}
          />
        </div>
        <button
          className="delete-image account-btn"
          onClick={() => handleDeleteImage(index)}
        >
          Supprimer
        </button>
      </label>
    ));
  };

  return (
    <div className="images-secondary-section">
      <p>Images secondaires :</p>
      <div className="images-wrapper">{renderFileInputs()}</div>
    </div>
  );
};

export default ImagesSecondary;
