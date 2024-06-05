import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "./hooks/useFavoriteButton";

const FavoriteButton = ({ productId, materialId }) => {
  const { isLiked, handleClickHeart, clicked } = useFavorite(
    productId,
    materialId
  );

  const heartColor = "var(--favorite-heart-bg)";

  return (
    <button
      aria-label="Ajouté aux favoris"
      className={`${clicked ? "clicked" : ""} like ${
        isLiked ? "info-tooltip" : ""
      }`}
      onClick={handleClickHeart}
    >
      {isLiked ? (
        <AiFillHeart color={heartColor} aria-hidden="true" />
      ) : (
        <AiOutlineHeart color={heartColor} aria-hidden="true" />
      )}
    </button>
  );
};

export default FavoriteButton;
