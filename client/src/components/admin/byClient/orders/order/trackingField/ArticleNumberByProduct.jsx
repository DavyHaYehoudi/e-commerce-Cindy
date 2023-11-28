import React from "react";
import {
  getProductDetails,
  getProductProperties,
  getProductStateInfo,
} from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";

const ArticleNumberByProduct = ({
  clientId,
  orderId,
  setSelectedProducts,
  checkboxStates,
  setCheckboxStates,
  articleNumber,
  setArticleNumber
}) => {
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

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
  const handleNumberChange = (productId, value) => {
    setArticleNumber((prev) => ({
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
        const details = getProductDetails(
          productActions,
          clientId,
          orderId,
          product.productId
        );
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
                <span>{details.material}</span>
                {details.articleNumber > 1 && (
                  <input
                    type="number"
                    id="articleNumberInput"
                    min="0"
                    max={details.articleNumber}
                    placeholder="Nombre d'articles à définir"
                    value={articleNumber[product.productId] || ""}
                    onChange={(e) =>
                      handleNumberChange(product.productId, e.target.value)
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
