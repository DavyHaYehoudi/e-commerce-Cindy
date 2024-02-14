import React, { useState } from "react";
import { getProductsInfo } from "../../../../../../selectors/productsByOrder";
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

  const handleCheckboxChange = (id, _id, productId, material) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setSelectedProducts((prev) => {
      const updatedSelectedProducts = { ...prev };
      if (checkboxStates[id]) {
        delete updatedSelectedProducts[_id];
      } else {
        updatedSelectedProducts[_id] = { productId, material };
      }
      return updatedSelectedProducts;
    });

    if (!checkboxStates[id] && articleNumber[_id]?.value > 1) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  const handleNumberChange = (_id, value, articlesNumberMax, material) => {
    setArticleNumber((prev) => ({
      ...prev,
      [_id]: { value, articlesNumberMax, material },
    }));
    setInputValues((prev) => ({
      ...prev,
      [_id]: value,
    }));
  };

  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsByOrderStore = useSelector(
    (state) => state?.productsByOrder?.data
  );
  const { getProductsByOrder } = getProductsInfo(
    ordersStore,
    productsByOrderStore,
    orderId
  );

  return (
    <div data-testid="articleNumberByProduct">
      {getProductsByOrder?.map((product) => {
        const properties = getProductProperties(
          product.productId,
          productStore
        );

        return (
          <div className="articleNumberByProduct-container" key={product._id}>
            <input
              type="checkbox"
              id={product._id}
              checked={checkboxStates[product._id] || false}
              onChange={() =>
                handleCheckboxChange(
                  product._id,
                  product._id,
                  product.productId,
                  product.material
                )
              }
            />
            <label htmlFor={product._id}>
              <div className="articleNumberByProduct-description">
                <span>{properties.name}</span>
                <span>{getMaterialProperty(product.material).name}</span>
                {product.quantity > 1 && (
                  <input
                    type="number"
                    className="articleNumberInput"
                    id={product._id}
                    min="0"
                    max={product.quantity}
                    placeholder="Nombre d'articles à définir"
                    value={articleNumber[`${product._id}`]?.value ?? ""}
                    onChange={(e) =>
                      handleNumberChange(
                        product._id,
                        e.target.value,
                        product.quantity,
                        product.material
                      )
                    }
                    onBlur={() =>
                      handleCheckQuantity(
                        inputValues,
                        ordersStore,
                        productsByOrderStore,
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
