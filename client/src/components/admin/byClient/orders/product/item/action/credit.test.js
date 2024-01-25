import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { render } from "../../../../../../../test/utils";
import Credit from "./Credit";

const mockStore = configureStore([]);

describe("Credit Component", () => {
  const initialState = {
    credit: {
      data: [
        {
          id: "idMongoDbGenerate1",
          productsByOrderId: 1,
          amount: 10,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
      ],
    },
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

  test("renders the component with basic data", () => {
    const productsByOrderInfo = {
      exchange: 1,
      refund: 1,
      credit: true,
    };
    const label = "Ajouter Avoir";
    const isActionSelected = true;
    const inputCreditAmount = 10;
    const inputDateValue = "2023-04-05";
    const productsByOrderActions = {
      isAddCredit: true,
      creditContent: {
        amount: 10,
        dateExpire: "2023-04-05",
      },
    };
    const placeholderValue = "Saisir le montant de l'avoir";
    const textCancel = "Annuler Avoir";
    const client = { id: 1 };
    const productId = 1;
    const orderId = "orderId";
    const productsByOrder = {
      id: 1,
    };
    const setProductActions = jest.fn();
    const setEntryError = jest.fn();
    const setConfirmation = jest.fn();
    const setInteraction = jest.fn();

    render(
      <Credit
        interaction={{ activeLi: "CREDIT" }}
        action="CREDIT"
        actions={{ CREDIT: "CREDIT" }}
        label={label}
        productsByOrderInfo={productsByOrderInfo}
        isActionSelected={isActionSelected}
        inputCreditAmount={inputCreditAmount}
        inputDateValue={inputDateValue}
        productsByOrderActions={productsByOrderActions}
        placeholderValue={placeholderValue}
        textCancel={textCancel}
        client={client}
        productId={productId}
        orderId={orderId}
        productsByOrder={productsByOrder}
        setProductActions={setProductActions}
        setEntryError={setEntryError}
        setConfirmation={setConfirmation}
        setInteraction={setInteraction}
      />,
      { store }
    );

    expect(screen.getByTestId("credit-component")).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Saisir le montant de l'avoir/i)).toHaveValue(inputCreditAmount);
    expect(screen.getByLabelText(/Valable jusqu'au/i)).toHaveValue(inputDateValue); 
  });
})