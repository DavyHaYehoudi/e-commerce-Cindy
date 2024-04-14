import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const MainImage = ({
  mainImage,
  handleMainImageChange,
  fileInputId,
  loading,
  handleDeleteImage,
  addNewimage,
  handleAddNewImage,
}) => {
  const isFileType = mainImage?.name;
  return (
    <div className="main-image">
      <figure>
        <figcaption>Image principale</figcaption>
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
        <div className="actionImage">
          <button
            className="delete-image account-btn"
            onClick={handleDeleteImage}
          >
            Supprimer{" "}
          </button>
          {addNewimage && (
            <button
              className="add-image account-btn"
              onClick={handleAddNewImage}
            >
              Ajouter cette nouvelle image <br />
              <span className=" underline">{isFileType || ""} </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MainImage;
