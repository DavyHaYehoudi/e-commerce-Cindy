import React, { useState } from "react";
import {
  getProductDetails,
  getProductProperties,
} from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";

const ArticleNumberByProduct = ({
  trackingNumberListItem,
  products,
  clientId,
  orderId,
}) => {
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

  return (
    <div>
    {trackingNumberListItem?.products?.map((productTracking, i) => (
      <div className="articleNumberByProduct-container" key={i}>
        <input
          type="checkbox"
          id={productTracking.id}
          checked={checkboxStates[productTracking.id] || false}
          onChange={() => handleCheckboxChange(productTracking.id)}
        />
        <label htmlFor={productTracking.id}>
          {getProductProperties(productTracking.id, productsStore).name}
          {products?.map((p, j) => {
            const details = getProductDetails(productActions, clientId, orderId, p.productId);
            return (
              <div key={j}>
                <span>material: {details.material}</span>
                <span>articleNumber: {details.articleNumber}</span>
                {details.articleNumber > 1 && (
                  <input
                    type="number"
                    className="productActionInput"
                    value={inputArticleNumber}
                    min="0"
                    onChange={handleChangeInputArticleNumber}
                    placeholder="Nombre d'articles"
                  />
                )}
              </div>
            );
          })}
        </label>
      </div>
    ))}
  </div>
  );
};

export default ArticleNumberByProduct;
