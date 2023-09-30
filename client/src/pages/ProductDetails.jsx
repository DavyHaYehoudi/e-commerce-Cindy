import React from "react";
import { useLocation } from "react-router-dom";
import ImageCarousel from "../components/dumbs/ImageCarousel";

const Product = () => {
  let { state } = useLocation();
  const { title, image, description, isNew, oldPrice, price } =
    state.product.item;

  return (
    <div className="product-detail-container">
      <div className="images-container">
        <ImageCarousel mainImage={image} />
      </div>
      <div className="description-container">
        <h2>
          {title} {isNew && <span>NOUVEAU</span>}{" "}
        </h2>
        <div className="prices">
          <span className="price">€{price} EUR</span>
          <span className="oldPrice">€{oldPrice} EUR</span>
        </div>
        <p className="separator"></p>
        <div className="quantity-section">
          <label htmlFor="quantity">Quantité:</label>
          <input type="number" id="quantity" name="quantity" />
        </div>
        <p>{description}</p>
        <button className="buy-button">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default Product;
