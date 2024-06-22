import React from "react";
import { getProductProperties } from "../../../../../../../selectors/product";
import { useSelector } from "react-redux";
import { getMaterialProperty } from "../../../../../../../selectors/material";

const ProductListItem = ({
  product,
  articleNumber,
  productStore,
  material,
}) => {
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);
  const productProperties = getProductProperties(
    product.productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    materialStore
  );
  return (
    <small>
      <li className="description">
        <span>- {productProperties.name} </span>
        <span>{getMaterialProperty(material, materialStore)?.name}</span>
        <span>
          {" "}
          {articleNumber || 1} article{articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
