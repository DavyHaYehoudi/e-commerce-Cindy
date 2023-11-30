import React, { useState } from "react";
import {
  getProductProperties,
  getProductStateInfo,
} from "../../../../../../helpers/storeDataUtils";
import { handleCheckQuantity } from "./handle/articlesNumberCheck";

const ArticleNumberByProduct = ({
  clientId,
  orderId,
  checkboxStates,
  articleNumber,
  productsStore,
  productActions,
  setCheckboxStates,
  setSelectedProducts,
  setArticleNumber,
  setError,
  setIsFormValid,
}) => {
  const [inputValues, setInputValues] = useState({});

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

  const { productsByOrder } = getProductStateInfo(
    productActions,
    clientId,
    orderId
  );

  return (
    <div>
      {productsByOrder?.map((product) => {
        const properties = getProductProperties(
          product.productId,
          productsStore
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
                <span>{product.material}</span>
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
                        productActions,
                        clientId,
                        orderId,
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
