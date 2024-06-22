import React from "react";
import { Link } from "react-router-dom";
import useStoreInfo from "./hooks/useStoreInfo";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "../helpers/utils/prices";
import isCurrent from "../helpers/utils/isCurrentDate";
import useCardProduct from "./hooks/useCardProduct";

const CardProduct = ({ product, material }) => {
  const { currentImage, handleMouseEnter, handleMouseLeave, materialName } =
    useCardProduct(material?.main_image, product?.secondary_images, material);
  const { isProductInCart } = useStoreInfo({
    productsId: product?._id,
    material: material?._id,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const amount = material?.promotion?.amount;
  const currentPrice = material?.pricing?.currentPrice;
  const reductionAmount = (currentPrice * amount) / 100;
  const promoPrice = currentPrice - reductionAmount;

  return (
    <div className="card-product">
      <Link
        to={`/master-product/${product?._id}`}
        state={{ materialId: material?._id }}
        onClick={scrollToTop}
      >
        <div
          className="img-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={currentImage} alt={product?.name} />
        </div>
        <div className="card-info">
          <h4>{product?.name}</h4>
          <p>{materialName} </p>
          <p className="manufacture">ATELIER NORALYA</p>
          {isCurrent(material?.promotion?.endDate) && (
            <small className="promo-badge">EN PROMOTION</small>
          )}
          <p>
            {isCurrent(material?.promotion?.endDate)
              ? formatPrice(promoPrice)
              : formatPrice(material?.pricing?.currentPrice)}{" "}
          </p>
        </div>
      </Link>
      <div className="card-button">
        <AddToCartButton
          productsId={product?._id}
          material={material?._id}
          isProductInCart={isProductInCart}
        />
      </div>
      <div className="like-card">
        <FavoriteButton productId={product?._id} materialId={material?._id} />
      </div>
    </div>
  );
};

export default CardProduct;
