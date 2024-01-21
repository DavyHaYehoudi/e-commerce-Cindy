import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientTrackingItem from "./ClientTrackingItem";
import { render } from "../../../../../../test/utils";
// import productMock from "../../../../../../mocks/productMock";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe("ClientTrackingItem Component", () => {
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
  const item = {
    id: "jhkjh534",
    value: "trackingNumberValue",
    date: "2023-01-15 08:30",
    products: [
      { id: 1, articlesNumber: "articleNumber1" },
      { id: 2, articlesNumber: "articleNumber2" },
    ],
  };

  const client = {
    id: "1mongoDb",
  };

  const orderId = "1mongoDb";

  const checkboxStates = {};
  const error = null;
  const selectedProducts = [];
  const isFormValid = true;
  // const productStore = productMock;
  const productStore = initialState.product.data;
  const setError = jest.fn();
  const setSelectedProducts = jest.fn();
  const setCheckboxStates = jest.fn();
  const setIsFormValid = jest.fn();

  test("renders the component with tracking item details", () => {
    render(
      <ClientTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        checkboxStates={checkboxStates}
        error={error}
        selectedProducts={selectedProducts}
        isFormValid={isFormValid}
        productStore={productStore}
        setError={setError}
        setSelectedProducts={setSelectedProducts}
        setCheckboxStates={setCheckboxStates}
        setIsFormValid={setIsFormValid}
      />
    );

    expect(
      screen.getByText(/trackingNumberValue/i)
    ).toBeInTheDocument();
  
    expect(
        screen.getByText(/Envoyé le \d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)
      ).toBeInTheDocument();
  });

  test("toggles edit mode correctly", () => {
    render(
      <ClientTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        checkboxStates={checkboxStates}
        error={error}
        selectedProducts={selectedProducts}
        isFormValid={isFormValid}
        productStore={productStore}
        setError={setError}
        setSelectedProducts={setSelectedProducts}
        setCheckboxStates={setCheckboxStates}
        setIsFormValid={setIsFormValid}
      />
    );

    const editButton = screen.getByLabelText("Modifier");
    // Open the editing section
    fireEvent.click(editButton);
    expect(screen.getByTestId("articleNumberByProduct")).toBeInTheDocument();
    expect(
      screen.getByTestId("trackingNumberClientItem-validate")
    ).toBeInTheDocument();

    // Close the editing section
    fireEvent.click(editButton);
    expect(screen.queryByLabelText("Article Number")).toBeNull();
  });
}); 
