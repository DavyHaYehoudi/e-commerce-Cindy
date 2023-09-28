import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductList = ({ item }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${item.image})`,
  };
  const productLink = `/produits/${item._id}`;
  return (
    <div className="collectionItem-Wrapper">
      <Link to={productLink} state={{ product: { item } }}>
        <div className="collectionItem-Img" style={backgroundImageStyle}></div>
        <div className="hearts">
          <span id="emptyHeart">
            <AiOutlineHeart />
          </span>
          <span id="fullHeart">
            <AiTwotoneHeart />
          </span>
        </div>
        <div className="collectionItem-Content">
          <h2>{item.title} </h2>
          <button>VOIR</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductList;
