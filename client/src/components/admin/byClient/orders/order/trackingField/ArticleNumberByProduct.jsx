import React, { useState } from "react";
import { getProductsInfo } from "../../../../../../selectors/products";
import { getProductProperties } from "../../../../../../selectors/product";
import { getMaterialProperty } from "../../../../../../helpers/constants/materials";
import { useSelector } from "react-redux";
import useCheckQuantity from "./hooks/useCheckQuantity";

const ArticleNumberByProduct = ({
  orderId,
  checkboxStates,
  articleNumber,
  productStore,
  setCheckboxStates,
  setSelectedProducts,
  setArticleNumber,
  setError,
  setIsFormValid,
}) => {
  const [inputValues, setInputValues] = useState({});
  const { handleCheckQuantity } = useCheckQuantity();

  const handleCheckboxChange = (id, productId) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setSelectedProducts((prev) =>
      checkboxStates[id]
        ? prev.filter((prevId) => prevId !== productId)
        : [...prev, productId]
    );
    if (!checkboxStates[id] && articleNumber[productId]?.value > 1) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };
  const handleNumberChange = (productId, value, articlesNumberMax) => {
    setArticleNumber((prev) => ({
      ...prev,
      [productId]: { value, articlesNumberMax },
    }));
    setInputValues((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };
  const ordersStore = useSelector((state) => state.orders);
  const productsStore = useSelector((state) => state.products);
  const { productsByOrder } = getProductsInfo(
    ordersStore,
    productsStore,
    orderId
  );

  return (
    <div>
      {productsByOrder?.map((product) => {
        const properties = getProductProperties(
          product.productId,
          productStore
        );

        return (
          <div
            className="articleNumberByProduct-container"
            key={product.productId}
          >
            <input
              type="checkbox"
              id={product.productId}
              checked={checkboxStates[product.productId] || false}
              onChange={() =>
                handleCheckboxChange(product.productId, product.productId)
              }
            />
            <label htmlFor={product.productId}>
              <div className="articleNumberByProduct-description">
                <span>{properties.name}</span>
                <span>{getMaterialProperty(product.material).name}</span>
                {product.quantity > 1 && (
                  <input
                    type="number"
                    id="articleNumberInput"
                    min="0"
                    max={product.quantity}
                    placeholder="Nombre d'articles à définir"
                    value={articleNumber[product.productId]?.value ?? ""}
                    onChange={(e) =>
                      handleNumberChange(
                        product.productId,
                        e.target.value,
                        product.quantity
                      )
                    }
                    onBlur={() =>
                      handleCheckQuantity(
                        inputValues,
                        ordersStore,
                        productsStore,
                        orderId,
                        checkboxStates,
                        setError,
                        setIsFormValid
                      )
                    }
                  />
                )}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleNumberByProduct;
