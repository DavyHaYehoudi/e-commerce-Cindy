import React, { useState, useEffect } from "react";
import { storage } from "../../../../../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import MoonLoader from "react-spinners/MoonLoader";

const MainImage = ({
  mainImage,
  handleMainImageChange,
  fileInputId,
  loading,
  handleDeleteImage,
}) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (mainImage) {
      const loadImageURL = async () => {
        const storageRef = ref(storage, mainImage);
        const url = await getDownloadURL(storageRef);
        setImageURL(url);
      };
      loadImageURL();
    } else {
      setImageURL(null);
    }
  }, [mainImage]);

  return (
    <div className="main-image">
      <figure>
        <div className="images-wrapper">
          <label htmlFor={fileInputId}>
            <div className="image-container main_image">
              {loading ? (
                <div className="loader">
                  <MoonLoader color="var(--dark)" />
                </div>
              ) : (
                <>
                  {imageURL ? (
                    <img src={imageURL} alt="Chargement..." />
                  ) : (
                    <span>+</span>
                  )}
                </>
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
        <figcaption>Image principale</figcaption>
      </figure>
      <button className="delete-image account-btn" onClick={handleDeleteImage}>
        Supprimer{" "}
      </button>
    </div>
  );
};

export default MainImage;
