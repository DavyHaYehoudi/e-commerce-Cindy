import React from "react";
import ImageCarousel from "../dumbs/ImageCarousel";
import QuantitySelectProduct from "../dumbs/QuantitySelectProduct";
import ProductMeta from "../dumbs/ProductMeta";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "../dumbs/AddToCartButton";
import ProductColorSelector from "./ProductColorSelector";

const ProductContent = ({ state, handleCartShow }) => {

  // Si un produit propose différents matériaux alors le prix change. Prévoir un DB avec un prix courant et une propriété materialColors qui sera un objet contenant les propriétés imbriquées name, code couleur, prix
  const { title, image, description, isNew, oldPrice, price } =
    state.product.item;
  const handleAddToCart = (productId) => {
    console.log(`Ajouter au panier : ${productId}`);
  };
  return (
    <div id="product-content">
      <div className="images-container">
        <ImageCarousel mainImage={image} />
      </div>
      <div className="description-container">
        <div className="description-heading">
          <h2>
            {title} {isNew && <span>NOUVEAU</span>}
          </h2>
          <FavoriteButton />
        </div>
        <div className="prices">
          <span className="price">€{price} EUR</span>
          <span className="oldPrice">€{oldPrice} EUR</span>
        </div>
        <div className="product-color-selector">
          <ProductColorSelector />
        </div>
        <p className="separator"></p>
        <QuantitySelectProduct />
        <AddToCartButton
          buttonText="Ajouter au panier"
          onClick={handleCartShow}
          additionalFunction={() => handleAddToCart("product.id")}
          className="buy-button btn"
        />
        <p>{description} </p>
        <ProductMeta />
      </div>
    </div>
  );
};

export default ProductContent;
