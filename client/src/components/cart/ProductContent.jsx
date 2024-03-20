import React from "react";
import ImageCarousel from "./ImageCarousel";
// import QuantitySelectProduct from "../../shared/QuantitySelectProduct";
import ProductMeta from "../../shared/ProductMeta";
import FavoriteButton from "../../shared/FavoriteButton";
import AddToCartButton from "../../shared/AddToCartButton";
import ProductColorSelector from "./ProductColorSelector";
import { formatPrice } from "../../helpers/utils/prices";

const ProductContent = ({ state, handleCartShow }) => {

  const { title, image, main_description, isNew, oldPrice, price } =
    state?.product?.item;
  const handleAddToCart = (productsId) => {
    console.log(`Ajouter au panier : ${productsId}`);
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
          <span className="price">{formatPrice(price)}</span>
          <span className="oldPrice">{formatPrice(oldPrice)}</span>
        </div>
        <div className="product-color-selector">
          <ProductColorSelector />
        </div>
        <p className="separator"></p>
        {/* <QuantitySelectProduct /> */}
        <AddToCartButton
          buttonText="Ajouter au panier"
          onClick={handleCartShow}
          additionalFunction={() => handleAddToCart("product._id")}
          className="buy-button btn"
        />
        <p>{main_description} </p>
        <ProductMeta />
      </div>
    </div>
  );
};

export default ProductContent;
