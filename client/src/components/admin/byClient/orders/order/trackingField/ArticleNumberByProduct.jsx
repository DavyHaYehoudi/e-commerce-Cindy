import React, { useState } from "react";
import {
  getProductDetails,
  getProductProperties,
  getProductStateInfo,
} from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";

const ArticleNumberByProduct = ({ clientId, orderId }) => {
  const [checkboxStates, setCheckboxStates] = useState({});
  const [inputArticleNumber, setInputArticleNumber] = useState("");
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

  const handleCheckboxChange = (id) => {
    setCheckboxStates({
      ...checkboxStates,
      [id]: !checkboxStates[id],
    });
  };

  const handleChangeInputArticleNumber = (e) => {
    setInputArticleNumber(e.target.value);
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
              onChange={() => handleCheckboxChange(product.productId)}
            />
            <label htmlFor={product.productId}>
              <div
                className="articleNumberByProduct-description"
                key={product.productId}
              >
                <span>{properties.name}</span>
                <span>{details.material}</span>
                {details.articleNumber > 1 ? (
                  <input
                    type="number"
                    id="articleNumberInput"
                    value={inputArticleNumber}
                    min="0"
                    onChange={handleChangeInputArticleNumber}
                    placeholder="Nombre d'articles à définir"
                  />
                ) : (
                  <span>1 article</span>
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
