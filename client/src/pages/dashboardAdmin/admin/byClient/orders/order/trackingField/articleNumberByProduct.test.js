import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { render } from "../../../../../../test/utils";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("ArticleNumberByProduct Component", () => {
  const initialState = {
    product: {
      data: [
        {
          id: 1,
          reference: "QER2345OIJD",
          name: "Boucles d'oreilles",
          pricing: {
            currentPrice: 50,
          },
          image: "product-image.jpg",
        },
      ],
    },
  };

  const store = mockStore(initialState);
  const orderId = "1mongoDb";
  const checkboxStates = {};
  const articleNumber = {};
  const productStore = initialState?.product?.data;
  const setCheckboxStates = jest.fn();
  const setSelectedProducts = jest.fn();
  const setArticleNumber = jest.fn();
  const setError = jest.fn();
  const setIsFormValid = jest.fn();

  test("renders the component with product details", () => {
    render(
      <ArticleNumberByProduct
        orderId={orderId}
        checkboxStates={checkboxStates}
        articleNumber={articleNumber}
        productStore={productStore}
        setCheckboxStates={setCheckboxStates}
        setSelectedProducts={setSelectedProducts}
        setArticleNumber={setArticleNumber}
        setError={setError}
        setIsFormValid={setIsFormValid}
      />,
      { store }
    );
    expect(screen.getByTestId("articleNumberByProduct")).toBeInTheDocument();
  });
});
