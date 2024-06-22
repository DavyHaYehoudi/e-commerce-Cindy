import React from "react";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";
import { Link } from "react-router-dom";

const CardCategory = ({ category }) => {
  const { imageUrl } = useFirebaseImage(category?.main_image);

  return (
    <Link to={`/menu-tab-categories/${category?._id} `}>
      <div className="category-card-ui">
        <h2 className="text-effect-1" >{category?.name}</h2>
        <img src={imageUrl} alt={category?.name} />
      </div>
    </Link>
  );
};

export default CardCategory;
