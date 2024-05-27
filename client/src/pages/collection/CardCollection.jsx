import React from "react";
import useFirebaseImage from "./hooks/useFirebaseImage";
import { Link } from "react-router-dom";

const CardCollection = ({ collection }) => {
  const { imageUrl, loading, error } = useFirebaseImage(collection?.main_image);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur de chargement de l'image</div>;
  }

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
