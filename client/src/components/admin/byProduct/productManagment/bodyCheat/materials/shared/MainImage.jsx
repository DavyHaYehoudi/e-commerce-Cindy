import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const MainImage = ({
  mainImage,
  handleMainImageChange,
  fileInputId,
  loading,
  handleDeleteImage,
}) => {
  return (
    <div className="main-image">
      <figure>
        <figcaption>
          Image principale<span className="asterix">*</span>{" "}
        </figcaption>
        <div className="images-wrapper">
          <label htmlFor={fileInputId}>
            <div className="image-container main_image">
              {loading ? (
                <div className="loader">
                  <MoonLoader color="var(--dark)" />
                </div>
              ) : mainImage ? (
                typeof mainImage === "string" ? (
                  <img src={mainImage} alt="Chargement1..." />
                ) : (
                  <>
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Chargement2..."
                    />
                  </>
                )
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
      </figure>
      {mainImage && (
        <button
          className="delete-image account-btn"
          onClick={handleDeleteImage}
        >
          Supprimer{" "}
        </button>
      )}
    </div>
  );
};

export default MainImage;
