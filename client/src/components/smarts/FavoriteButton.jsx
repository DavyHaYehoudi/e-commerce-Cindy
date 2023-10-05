import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
        <AiFillHeart color="#967F71" />
      ) : (
        <AiOutlineHeart color={isHovered ? "#967F71" : "#000000"} />
      )}
    </button>
  );
};

export default FavoriteButton;
