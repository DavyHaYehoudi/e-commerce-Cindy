import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { getProductProperties } from "../../../../../selectors/product";
import { formatDate } from "../../../../../helpers/utils/formatDate";
import { getMaterialProperty } from "../../../../../selectors/material";
import useFirebaseImage from "../../../../../shared/hooks/useFirebaseImage"

const Cart = ({ productsId, productCart }) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);
  const path =     getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    productCart?.material
  ).main_image
  const {imageUrl}=useFirebaseImage(path)
  return (
    <div className="cartUserViewAdmin" data-testid={`cart-item-${productsId}`}>
      <div>
        <p>
          <span className="dotted">Collection</span> :{" "}
          {
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              productCart?.material
            ).collection
          }
        </p>
        <p>
          <span className="dotted">Catégorie</span> :{" "}
          {
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              productCart?.material
            ).category
          }
        </p>
        <p>
          <span className="dotted">Nom</span> :{" "}
          {
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              productCart?.material
            )?.name
          }
        </p>
        {getMaterialProperty(productCart.material, materialStore)?.name !==
          null && (
          <p>
            <span className="dotted">Matériau</span> :{" "}
            {getMaterialProperty(productCart.material, materialStore)?.name}
          </p>
        )}

        <p>
          <span className="dotted">Prix</span> :{" "}
          {formatPrice(
            getProductProperties(
              productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              productCart?.material
            ).pricing?.currentPrice
          )}
        </p>
        <p>
          <span className="dotted">Ajouté le</span> :{" "}
          {formatDate(productCart.addDate)}{" "}
        </p>
      </div>
      <div className="info-tooltip" aria-label="Revenir à la fiche produit">
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
                productCart?.material
              ).name
            }
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
