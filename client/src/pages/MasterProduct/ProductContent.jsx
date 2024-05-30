import React from "react";
import ImageCarousel from "../../pages/MasterProduct/ImageCarousel";
// import QuantitySelectProduct from "../../shared/QuantitySelectProduct";
import ProductMeta from "../../shared/ProductMeta";
import FavoriteButton from "../../shared/FavoriteButton";
import AddToCartButton from "../../shared/AddToCartButton";
import ProductColorSelector from "../../pages/MasterProduct/ProductColorSelector";
import { formatPrice } from "../../helpers/utils/prices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductContent = () => {
  const { productId } = useParams();
  // console.log('productId:', productId)
  const productsStore = useSelector((state) => state?.product?.data);
  const product = productsStore?.find((product) => product._id === productId);

  const { name, main_image, main_description} =
    product || {};
  const handleAddToCart = (productsId) => {
    console.log(`Ajouter au panier : ${productsId}`);
  };
  return (
    <div id="product-content">
      <div className="images-container">
        <ImageCarousel mainImage={main_image} />
      </div>
      <div className="description-container">
        <div className="description-heading">
          <h2>
            {/* {name} {untilNew && <span>NOUVEAU</span>} */}
          </h2>
          <FavoriteButton />
        </div>
        <div className="prices">
          {/* <span className="price">{formatPrice(pricing?.currentPrice)}</span>
          <span className="oldPrice">{formatPrice(pricing?.oldPrice)}</span> */}
        </div>
        <div className="product-color-selector">
          <ProductColorSelector />
        </div>
        <p className="separator"></p>
        {/* <QuantitySelectProduct /> */}
        <AddToCartButton
          buttonText="Ajouter au panier"
          // onClick={handleCartShow}
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
