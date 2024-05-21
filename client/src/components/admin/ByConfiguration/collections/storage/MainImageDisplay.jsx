import React from "react";
import useIllustrationDisplay from "../hooks/useIllustrationDisplay";
import MoonLoader from "react-spinners/MoonLoader";

const MainImageDisplay = (collectionId) => {
  const { mainImageDisplay, loading } = useIllustrationDisplay(collectionId);

  return (
    <div className="main-image">
      <figure>
        <div className="images-wrapper">
          <label>
            <div className="image-container main_image">
              {loading ? (
                <div className="loader">
                  <MoonLoader color="var(--dark)" />
                </div>
              ) : (
                <img src={mainImageDisplay} alt="Chargement1..." />
              )}
            </div>
          </label>
        </div>
      </figure>
    </div>
  );
};

export default MainImageDisplay;
