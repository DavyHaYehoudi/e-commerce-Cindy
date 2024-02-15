import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import List from ".";
import { render } from "../../../../../test/utils";
import { bo } from "../../../../../assets/bo.png";
import { bar } from "../../../../../assets/bar.png";

describe("List Component", () => {
  const mockState = {
    orders: {
      data: [{ _id: 1, productsByOrder: [1, 2] }],
    },
    productsByOrder: {
      data: [
        { _id: 1, productId: 1, quantity: 2 },
        { _id: 2, productId: 2, quantity: 1 },
      ],
    },
    product: {
      data: [
        {
          _id: 1,
          reference: "QER2345OIJD",
          category: "Jewelry",
          name: "Boucles d'oreilles",
          image: bo,
          description:
            "Magnifiques boucles d'oreilles pour des occasions uniques et qui vous mettront en valeur.",
          materials: [0, 1, 2, 3],
          pricing: {
            currentPrice: 50,
            oldPrice: 65,
          },
        },
        {
          _id: 2,
          reference: "ABC123XYZ",
          category: "Clothing",
          name: "Robe élégante",
          image: bar,
          description:
            "Une robe élégante parfaite pour les soirées spéciales. Confortable et stylée.",
          materials: [2, 3],
          pricing: {
            currentPrice: 120,
            oldPrice: 140,
          },
        },
      ],
    },
  };

  // Configuration du store avec redux-mock-store
  const mockStore = configureStore([]);
  const store = mockStore(mockState);

  const client = {
    _id: 1,
  };
  test("renders productsByOrder correctly", () => {
    render(<List client={client} orderId={1} />, { store });

    expect(screen.getByTestId("productsByOrder-container")).toBeInTheDocument();

  });
});
