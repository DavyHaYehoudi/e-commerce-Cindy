import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Transaction from "./Transaction";
import { render } from "../../../../../../../test/utils";
import configureStore from "redux-mock-store";

const productMock = [
  {
    id: 1,
    reference: "QER2345OIJD",
    category: "Jewelry",
    name: "Boucles d'oreilles",
    image: "product-image.jpg",
    description:
      "Magnifiques boucles d'oreilles pour des occasions uniques et qui vous mettront en valeur.",
    materials: [0, 1, 2, 3],
    pricing: {
      currentPrice: 50,
      oldPrice: 65,
    },
  },
  {
    id: 2,
    reference: "ABC123XYZ",
    category: "Clothing",
    name: "Robe élégante",
    image: "product-image.jpg",
    description:
      "Une robe élégante parfaite pour les soirées spéciales. Confortable et stylée.",
    materials: [2, 3],
    pricing: {
      currentPrice: 120,
      oldPrice: 140,
    },
  },
];

describe("Transaction Component", () => {
  test("renders Transaction component correctly", () => {
    const setProductActionsMock = jest.fn();
    const setEntryErrorMock = jest.fn();
    const setConfirmationMock = jest.fn();
    const setInteractionMock = jest.fn();

    render(
      <Transaction
        interaction={{ activeLi: "someAction" }}
        action="someAction"
        actions={["someAction"]}
        label="Some Label"
        placeholderValue="Some Placeholder"
        productId={1}
        orderId={1}
        textCancel="Cancel Text"
        productsByOrderInfo={{ someAction: "info" }}
        productsByOrderState={productMock}
        isActionSelected={true}
        inputQuantityValue={5}
        productsByOrderActions={{ someAction: "someAction" }}
        articleNumber={10}
        setEntryError={setEntryErrorMock}
        setProductActions={setProductActionsMock}
        setInteraction={setInteractionMock}
        setConfirmation={setConfirmationMock}
      />
    );
    expect(screen.getByTestId("transaction-component")).toBeInTheDocument();
    const quantityField = screen.getByPlaceholderText("Some Placeholder");
    expect(quantityField.value).toBe("5");
  });
});

const mockStore = configureStore([]);

describe("Transaction Component with interaction input", () => {
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

  test("renders the component with basically", () => {
    const productsByOrderInfo = {
      exchange: 1,
      refund: 1,
    };
    const productId = 1;
    const orderId = "order123";
    const action = "EXCHANGE";
    const actions = {
      EXCHANGE: "EXCHANGE",
      REFUND: "REFUND",
    };
    const label = "Échange";
    const placeholderValue = "Quantité d'articles à échanger";
    const textCancel = "Annuler l'échange";

    render(
      <Transaction
        interaction={{ activeLi: "EXCHANGE" }}
        action={action}
        actions={actions}
        label={label}
        placeholderValue={placeholderValue}
        productId={productId}
        orderId={orderId}
        textCancel={textCancel}
        productsByOrderInfo={productsByOrderInfo}
        productsByOrderState={initialState.product.data}
        isActionSelected={true}
        inputQuantityValue={1}
        productsByOrderActions={{ exchangeContent: 1 }}
        articleNumber={10}
        setEntryError={jest.fn()}
        setProductActions={jest.fn()}
        setInteraction={jest.fn()}
        setConfirmation={jest.fn()}
      />,
      { store }
    );

    expect(screen.getByTestId("transaction-component")).toBeInTheDocument();
    expect(screen.getByText(/Échange/i)).toBeInTheDocument();
  });

  test("renders input and buttons when action is selected", () => {
    const productsByOrderInfo = {
      exchange: 1,
      refund: 1,
    };
    const productId = 1;
    const orderId = "order123";
    const action = "EXCHANGE";
    const actions = {
      EXCHANGE: "EXCHANGE",
      REFUND: "REFUND",
    };
    const label = "Échange";
    const placeholderValue = "Quantité d'articles à échanger";
    const textCancel = "Annuler l'échange";

    render(
      <Transaction
        interaction={{ activeLi: "EXCHANGE" }}
        action={action}
        actions={actions}
        label={label}
        placeholderValue={placeholderValue}
        productId={productId}
        orderId={orderId}
        textCancel={textCancel}
        productsByOrderInfo={productsByOrderInfo}
        productsByOrderState={initialState.product.data}
        isActionSelected={true}
        inputQuantityValue={1}
        productsByOrderActions={{ exchangeContent: 1 }}
        articleNumber={10}
        setEntryError={jest.fn()}
        setProductActions={jest.fn()}
        setInteraction={jest.fn()}
        setConfirmation={jest.fn()}
      />,
      { store }
    );

    expect(screen.getByPlaceholderText(/Quantité d'articles à échanger/i)).toHaveValue(1);
    expect(screen.getByText(/Valider/i)).toBeInTheDocument();
    expect(screen.getByText(/Annuler/i)).toBeInTheDocument();
  });
});
