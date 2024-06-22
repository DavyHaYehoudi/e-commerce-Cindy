import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { formatDate } from "../../../../../helpers/utils/formatDate";
import useProductDetails from "./hooks/useProductDetails";

const ProductItem = ({ productsId, productCart, type }) => {
  const { productProperties, materialName, imageUrl } = useProductDetails(
    productsId,
    productCart?.material
  );

  return (
    <div
      className={`${type}UserViewAdmin`}
      data-testid={`${type}-item-${productsId}`}
    >
      <div>
        <p>
          <span className="dotted">Collection</span> :{" "}
          {productProperties?.collection}
        </p>
        <p>
          <span className="dotted">Catégorie</span> :{" "}
          {productProperties?.category}
        </p>
        <p>
          <span className="dotted">Nom</span> : {productProperties?.name}
        </p>
        {materialName && (
          <p>
            <span className="dotted">Matériau</span> : {materialName}
          </p>
        )}
        <p>
          <span className="dotted">Prix</span> :{" "}
          {formatPrice(productProperties.pricing?.currentPrice)}
        </p>
        <p>
          <span className="dotted">Ajouté le</span> :{" "}
          {formatDate(productCart?.addDate)}
        </p>
      </div>
      <div className="info-tooltip" aria-label="Revenir à la fiche produit">
        <Link
          to={`/master-product/${productsId}`}
          state={{ materialId: productCart?.material }}
        >
          <img
            src={imageUrl}
            alt={productProperties?.name}
            width="100px"
            height="100px"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
