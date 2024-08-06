import React from "react";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";
import { Link } from "react-router-dom";

const CardCollection = ({ collection }) => {
  const { imageUrl } = useFirebaseImage(collection?.main_image);

  return (
    <Link to={`/menu-tab-collections/${collection?._id} `}>
      <div className="collection-card-ui">
        <h2>{collection?.name}</h2>
        <img src={imageUrl} alt={collection?.name} />
      </div>
    </Link>
  );
};

export default CardCollection;
