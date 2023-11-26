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
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

  const handleCheckboxChange = (id) => {
    setCheckboxStates({
      ...checkboxStates,
      [id]: !checkboxStates[id],
    });
  };

  return (
    <div>
      {(trackingNumberListItem?.products ?? []).length > 0 &&
        trackingNumberListItem?.products?.map((productTracking) => (
          <div
            className="articleNumberByProduct-container"
            key={productTracking.id}
          >
            <input
              type="checkbox"
              id={productTracking.id}
              checked={checkboxStates[productTracking.id] || false}
              onChange={() => handleCheckboxChange(productTracking.id)}
            />
            <label htmlFor={productTracking.id}>
              {getProductProperties(productTracking.id, productsStore).name}
              {products?.map((p) => (
                <div>

                <span>material:
                  {
                    getProductDetails(productActions, clientId, orderId, p.productId)
                      .material
                  }
                </span>
                <span>articleNumber :{
                  getProductDetails(productActions, clientId, orderId, p.productId)
                    .articleNumber
                }</span>
                
                </div>
              ))}

            </label>
          </div>
        ))}
    </div>
  );
};

export default ArticleNumberByProduct;
