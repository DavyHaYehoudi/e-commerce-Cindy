import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { render } from "../../../../../../test/utils";
import productMock from "../../../../../../mocks/productMock";

describe("ArticleNumberByProduct Component", () => {
  const orderId = "1mongoDb";
  const checkboxStates = {};
  const articleNumber = {};
  const productStore = productMock;
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
      />
    );
    expect(screen.getByTestId("articleNumberByProduct")).toBeInTheDocument();
  });
});
