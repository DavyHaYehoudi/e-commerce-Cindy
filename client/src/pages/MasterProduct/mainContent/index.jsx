import React from "react";
import ImageCarousel from "../imagesStorage";
import QuantitySelectProduct from "../../../shared/QuantitySelectProduct";
import ProductMeta from "../../../shared/ProductMeta";
import FavoriteButton from "../../../shared/FavoriteButton";
import AddToCartButton from "../../../shared/AddToCartButton";
import ProductColorSelector from "./ProductColorSelector";
import { formatPrice } from "../../../helpers/utils/prices";
import { formatDate } from "../../../helpers/utils/formatDate";
import useMainContent from "../hooks/useMainContent";
import isCurrent from "../../../helpers/utils/isCurrentDate";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";

const MainContent = ({ productId, materialId }) => {
  const { product, materialSelected, handleMaterialSelected } = useMainContent({
    productId,
    materialId,
  });
  const { isProductInCart } = useStoreInfo({
    productsId: productId,
    material: materialSelected?.id,
  });
  //if promotion
  const currentPrice =
    product?.materials[materialSelected.index]?.pricing?.currentPrice;
  const amount = product?.materials[materialSelected.index]?.promotion?.amount;
  const reductionAmount = (currentPrice * amount) / 100;
  const promoPrice = currentPrice - reductionAmount;

  return (
    <div id="master-product-content">
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
          <FavoriteButton
            productId={productId}
            materialId={materialSelected?.id}
          />
        </div>
        {isCurrent(
          product?.materials[materialSelected.index]?.promotion?.endDate
        ) && (
          <p>
            <span className="promo-badge">
              {" "}
              PROMOTION{" "}
              {
                product?.materials[materialSelected.index]?.promotion?.amount
              }%{" "}
            </span>
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
            {isCurrent(
              product?.materials[materialSelected.index]?.promotion?.endDate
            )
              ? formatPrice(promoPrice)
              : formatPrice(
                  product?.materials[materialSelected.index]?.pricing
                    ?.currentPrice
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
        <div className="addToCartContainer">
          {isProductInCart && (
            <QuantitySelectProduct
              productId={productId}
              materialId={materialSelected?.id}
            />
          )}
          <div className="addToCart">
            <AddToCartButton
              productsId={productId}
              material={materialSelected?.id}
              isProductInCart={isProductInCart}
            />
          </div>
        </div>
        <p className="product-description">{product?.main_description} </p>
        <ProductMeta />
      </div>
    </div>
  );
};

export default MainContent;
