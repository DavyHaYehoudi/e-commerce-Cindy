import React from "react";
import ImageCarousel from "../dumbs/ImageCarousel";
import QuantitySelectProduct from "../dumbs/QuantitySelectProduct";

const ProductContent = ({ state, handleCartShow }) => {
  const { title, image, description, isNew, oldPrice, price } =
    state.product.item;
  return (
    <div id="product-content">
      <div className="images-container">
        <ImageCarousel mainImage={image} />
      </div>
      <div className="description-container">
        <h2>
          {title} {isNew && <span>NOUVEAU</span>}
        </h2>
        <div className="prices">
          <span className="price">€{price} EUR</span>
          <span className="oldPrice">€{oldPrice} EUR</span>
        </div>
        <p className="separator"></p>
        <QuantitySelectProduct />
        <button className="buy-button btn" onClick={handleCartShow}>
          Ajouter au panier
        </button>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductContent;
