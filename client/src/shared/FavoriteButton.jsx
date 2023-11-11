import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const heartColor = "var(--button-background)";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isFavorite) {
      setIsHovered(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Ajouter aux favoris"
      className={!isFavorite ? "info-tooltip" : ""}
    >
      {isFavorite ? (
        <AiFillHeart color={heartColor} aria-hidden="true" />
      ) : (
        <AiOutlineHeart
          color={isHovered ? heartColor : "#000000"}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
