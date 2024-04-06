import React, { useState, useEffect } from "react";
import { storage } from "../../../../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import MoonLoader from "react-spinners/MoonLoader";

const ImagesSecondary = ({
  imagesSecondary,
  handleChangeImagesSecondary,
  handleDeleteImage,
}) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);

  useEffect(() => {
    if (imagesSecondary) {
      const fetchImageURLs = async () => {
        const urls = await Promise.all(
          imagesSecondary?.map(async (image) => {
            if (image) {
              const storageRef = ref(storage, image);
              const url = await getDownloadURL(storageRef);
              return url;
            }
            return null;
          })
        );
        setImageURLs(urls);
        setLoadingStates(new Array(urls.length).fill(false));
      };

      fetchImageURLs();
    }
  }, [imagesSecondary]);

  const handleImageLoading = (index) => {
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);
  };

  return (
    <div className="images-secondary-section">
      <p>Images secondaires :</p>
      <div className="images-wrapper">
        {imageURLs?.map((url, index) => (
          <label key={index} htmlFor={`file-upload-${index}`}>
            <div className="image-container secondary_image">
              {loadingStates[index] ? (
                <div className="loader">
                  <MoonLoader color="var(--dark)" />
                </div>
              ) : url ? (
                <img src={url} alt="Chargement..." />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                id={`file-upload-${index}`}
                accept="image/*"
                onChange={(e) => {
                  handleChangeImagesSecondary(e, index);
                  handleImageLoading(index);
                }}
              />
            </div>
            <button
              className="delete-image account-btn"
              onClick={() => handleDeleteImage(index)}
            >
              Supprimer{" "}
            </button>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ImagesSecondary;
