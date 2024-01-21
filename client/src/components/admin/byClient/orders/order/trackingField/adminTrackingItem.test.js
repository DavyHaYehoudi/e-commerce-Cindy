import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminTrackingItem from "./AdminTrackingItem";
import { render } from "../../../../../../test/utils";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe("AdminTrackingItem Component", () => {
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
  const productStore = initialState.product.data;

  test("renders the component with tracking item details", () => {
    render(
      <AdminTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        productStore={productStore}
      />,{store}
    );

    expect(
      screen.getByText(/trackingNumberValue/i)
    ).toBeInTheDocument();
    expect(
        screen.getByText(/Envoyé le \d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)
      ).toBeInTheDocument();
  });

  test("shows confirmation dialog on trash icon click", () => {
    render(
      <AdminTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        productStore={productStore}
      />,{store}
    );

    const trashIcon = screen.getByLabelText("Supprimer ce numéro de suivi");
    fireEvent.click(trashIcon);

    expect(
      screen.getByText("⚠️ La suppression de ce numéro de suivi est définitive !")
    ).toBeInTheDocument();
  });

  test("dispatches deleteTrackingNumber action on confirmation", () => {
    render(
      <AdminTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        productStore={productStore}
      />,{store}
    );

    const trashIcon = screen.getByLabelText("Supprimer ce numéro de suivi");
    fireEvent.click(trashIcon);

    const confirmButton = screen.getByText("Confirmer");
    fireEvent.click(confirmButton);
  });

  test("cancels deletion on cancel button click", () => {
    render(
      <AdminTrackingItem
        item={item}
        client={client}
        orderId={orderId}
        productStore={productStore}
      />,{store}
    );

    const trashIcon = screen.getByLabelText("Supprimer ce numéro de suivi");
    fireEvent.click(trashIcon);

    const cancelButton = screen.getByText("Annuler");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("⚠️ La suppression de ce numéro de suivi est définitive !")).toBeNull();
  });
});
