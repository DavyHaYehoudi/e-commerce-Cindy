import React, { useState } from "react";
import { getProductsInfo } from "../../../../../../selectors/orderProducts";
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

  const handleCheckboxChange = (id, _id, productsId, material) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setSelectedProducts((prev) => {
      const updatedSelectedProducts = { ...prev };
      if (checkboxStates[id]) {
        delete updatedSelectedProducts[_id];
      } else {
        updatedSelectedProducts[_id] = { productsId, material,_id };
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
  const orderProductsStore = useSelector(
    (state) => state?.orderProducts?.data
  );
  const { getProductsByOrder } = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId
  );

  return (
    <div data-testid="articleNumberByProduct">
      {getProductsByOrder?.map((product) => {
        const properties = getProductProperties(
          product.productsId,
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
                  product.productsId,
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
                        orderProductsStore,
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
