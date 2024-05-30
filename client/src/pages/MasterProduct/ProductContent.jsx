import React from "react";
import ImageCarousel from "./imagesStorage/ImageCarousel";
import QuantitySelectProduct from "../../shared/QuantitySelectProduct";
import ProductMeta from "../../shared/ProductMeta";
import FavoriteButton from "../../shared/FavoriteButton";
import AddToCartButton from "../../shared/AddToCartButton";
import ProductColorSelector from "../../pages/MasterProduct/ProductColorSelector";
import { formatPrice } from "../../helpers/utils/prices";
import { formatDate } from "../../helpers/utils/formatDate";
import useProductContent from "./hooks/useProductContent";
import isCurrent from "../../helpers/utils/isCurrentDate";

const ProductContent = () => {
  const {
    product,
    materialSelected,
    handleMaterialSelected,
    handleAddToCart,
  } = useProductContent();

  return (
    <div id="product-content">
      <div className="images-container">
        <ImageCarousel
          mainImage={materialSelected?.currentImage}
          secondaryImages={product?.secondary_images}
          handleMaterialSelected={handleMaterialSelected}
        />
      </div>
      <div className="description-container">
        <div className="description-heading">
          <h2>
            {product?.name}
            {isCurrent(
              product?.materials[materialSelected.index]?.untilNew
            ) && <span>NOUVEAU</span>}
          </h2>
          <FavoriteButton />
        </div>
        {isCurrent(
          product?.materials[materialSelected.index]?.promotion?.endDate
        ) && (
          <p><span className="promo-badge">     PROMOTION{" "}
          {product?.materials[materialSelected.index]?.promotion?.amount}%{" "}</span>
       
            <small>
            (jusqu'au :{" "}
              {formatDate(
                product?.materials[materialSelected.index]?.promotion?.endDate
              )}
              )
            </small>{" "}
          </p>
        )}
        <div className="prices">
          <span className="price">
            {formatPrice(
              product?.materials[materialSelected.index]?.pricing?.currentPrice
            )}
          </span>
          {product?.materials[materialSelected.index]?.pricing?.oldPrice >
            0 && (
            <span className="oldPrice">
              {formatPrice(
                product?.materials[materialSelected.index]?.pricing?.oldPrice
              )}
            </span>
          )}
        </div>
        <div className="product-color-selector">
          <ProductColorSelector
            materialSelected={materialSelected}
            handleMaterialSelected={handleMaterialSelected}
            materialsProductId={product?.materials}
          />
        </div>
        <p className="separator"></p>
        <QuantitySelectProduct />
        <AddToCartButton
          buttonText="Ajouter au panier"
          additionalFunction={() => handleAddToCart(product?._id)}
          className="buy-button btn"
        />
        <p>{product?.main_description} </p>
        <ProductMeta />
      </div>
    </div>
  );
};

export default ProductContent;
