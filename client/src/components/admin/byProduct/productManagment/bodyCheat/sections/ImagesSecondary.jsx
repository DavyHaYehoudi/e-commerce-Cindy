import React, { useState, useEffect } from "react";
import { storage } from "../../../../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import MoonLoader from "react-spinners/MoonLoader";

const ImagesSecondary = ({
  imagesSecondary,
  handleChangeImagesSecondary,
  handleDeleteImage,
  currentAction,
  initialImageCount,
}) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const [deletedImageIndexes, setDeletedImageIndexes] = useState([]);

  useEffect(() => {
    if (imagesSecondary && currentAction === "edit") {
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
  }, [imagesSecondary, currentAction]);

  // Fill in with null elements if imagesSecondary length is less than 5
  const filledImages =
  imagesSecondary.length < initialImageCount
  ? [
    ...imagesSecondary,
    ...Array(initialImageCount - imagesSecondary.length).fill(null),
  ]
  : imagesSecondary;
  
  console.log('filledImages:', filledImages)
  return (
    <div className="images-secondary-section">
      <p>Images secondaires :</p>
      <div className="images-wrapper">
        {currentAction === "edit" &&
          imageURLs?.map(
            (url, index) =>
              // Vérifiez si l'index de l'image est dans la liste des images supprimées temporairement
              !deletedImageIndexes.includes(index) && (
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
                      onChange={(e) => handleChangeImagesSecondary(e, index)}
                    />
                  </div>
                  <button
                    className="delete-image account-btn"
                    onClick={() => {
                      handleDeleteImage(index);
                      setDeletedImageIndexes((prevIndexes) => [
                        ...prevIndexes,
                        index,
                      ]);
                    }}
                  >
                    Supprimer
                  </button>
                </label>
              )
          )}
        {currentAction === "create" &&
          filledImages.map((image, index) => (
            <label key={index} htmlFor={`file-upload-${index}`}>
              <div className="image-container secondary_image">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Chargement..." />
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
