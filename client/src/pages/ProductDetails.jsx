import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ImageCarousel from "../components/dumbs/ImageCarousel";

const Product = () => {
  const { id } = useParams();
  let { state } = useLocation();
  
  return (
    <div className="product-detail-container">
      <div className="images-container">
        <ImageCarousel />
      </div>
      <div className="description-container">
        <h2>{state.product.item.title}</h2>
        <p>Identifiant du produit : {id} </p>
        <p>Description détaillée du produit...</p>
        <div className="quantity-section">
          <label htmlFor="quantity">Quantité:</label>
          <input type="number" id="quantity" name="quantity" />
        </div>
        <button className="buy-button">Acheter en ligne</button>
      </div>
    </div>
  );
};

export default Product;
