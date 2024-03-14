import React from "react";
import { getProductProperties } from "../../../../../../selectors/product";
// import { getMaterialProperty } from "../../../../../../helpers/constants/materials";
import { useSelector } from "react-redux";
import { getMaterialProperty } from "../../../../../../selectors/material";

const ProductListItem = ({
  product,
  articleNumber,
  productStore,
  material
}) => {
  const materialStore = useSelector((state) => state?.material?.data);
  const productProperties = getProductProperties(
    product.productsId,
    productStore
  );
  return (
    <small>
      <li className="description">
        <span>- {productProperties.name} </span>
        <span>{getMaterialProperty(material,materialStore)?.name}</span>
        <span>
          {" "}
          {articleNumber || 1} article{articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
