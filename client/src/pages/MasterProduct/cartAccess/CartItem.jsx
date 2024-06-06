import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../selectors/product";
import { formatPrice } from "../../../helpers/utils/prices";
import QuantitySelectProduct from "../../../shared/QuantitySelectProduct";
import TrashIcon from "../../../shared/TrashIcon";
import useFirebaseImage from "../../../shared/hooks/useFirebaseImage";
import useCartButton from "../../../shared/hooks/useCartButton";

const CartItem = ({ product }) => {
  const [coefficient, setCoefficient] = useState(1);
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const { productsId, material } = product || {};
  const productInStore = productStore.find(
    (product) => product?._id === productsId
  );
  let imagePath;
  if (productInStore) {
    const materialMatch = productInStore.materials.find(
      (mat) => mat?._id === material
    );
    imagePath = materialMatch
      ? materialMatch.main_image
      : productInStore.materials[0]?.main_image;
  }

  const { imageUrl } = useFirebaseImage(imagePath);
  const { handleRemoveToCart } = useCartButton(productsId, material);

  const handleChangeQuantity = (quantity) => {
    setCoefficient(quantity);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <div className="info-tooltip" aria-label="Revenir à l'article">
          <Link>
            <img
              src={imageUrl}
              alt={
                getProductProperties(
                  productsId,
                  productStore,
                  collectionStore,
                  categoryStore,
                  tagStore,
                  material
                ).name
              }
              width="75px"
              height="75px"
            />
          </Link>
        </div>

        <div className="cart-item-name">
          {
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              material
            ).name
          }
        </div>
      </div>
      <div className="cart-item-bottom">
        <div className="cart-item-subtotal">
          {coefficient} x{" "}
          {formatPrice(
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              material
            )?.pricing?.currentPrice
          )}{" "}
          ={" "}
          {formatPrice(
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              material
            )?.pricing?.currentPrice * coefficient
          )}
        </div>
        <div className="cart-item-quantity">
          <QuantitySelectProduct
            handleChangeQuantity={handleChangeQuantity}
            productId={productsId}
            materialId={material}
          />
        </div>
        <div className="cart-item-delete" onClick={handleRemoveToCart}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
