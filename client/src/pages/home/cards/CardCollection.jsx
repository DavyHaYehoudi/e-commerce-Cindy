import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFirebaseImage from "../../../shared/hooks/useFirebaseImage";
import { Link } from "react-router-dom";

const CardCollection = ({ collection }) => {
  const { imageUrl } = useFirebaseImage(collection?.main_image);
  return (
    <div className="card-container card">
      <div className="box-image">
        <img src={imageUrl} alt={collection?.name} />
      </div>
      <div className="title">
        <Link to={`menu-tab-collections/${collection?._id}`}>
          {collection?.name}
        </Link>
        <br />
        <FaLongArrowAltRight />{" "}
      </div>
    </div>
  );
};

export default CardCollection;
