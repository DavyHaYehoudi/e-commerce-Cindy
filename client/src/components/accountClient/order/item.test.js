import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "./Item";
import { render } from "../../../test/utils";
import configureStore from "redux-mock-store";
import { materials } from "../../../constants/materials";

const mockStore = configureStore([]);
const initialState = {
  customer: {
    data: {
      orderProducts: [
        {
          productsId: 1,
          quantity: 2,
          material: 1,
        },
        {
          productsId: 2,
          quantity: 3,
          material: 2,
        },
      ],
    },
  },

  product: {
    data: [
      {
        _id: 1,
        reference: "QER2345OIJD",
        name: "Boucles d'oreilles",
        pricing: {
          currentPrice: 50,
        },
        image: "product-image.jpg",
      },
      {
        _id: 2,
        reference: "aEnjuiOIJz",
        name: "Bracelet",
        pricing: {
          currentPrice: 30,
        },
        image: "product-image.jpg",
      },
    ],
  },
};

describe("Item Component", () => {
  const store = mockStore(initialState);
  test("renders Item component with initial data", () => {
    render(<Item orderProducts={[1]} isReturnProduct={false} />, { store });

    // Vérifier que le composant Item est rendu
    expect(screen.getByTestId("order-items-user-account")).toBeInTheDocument();
  });

  test("renders product information correctly", () => {
    render(
      <Item
        orderProducts={[{ productsId: 1 }, { productsId: 2 }]}
        isReturnProduct={false}
      />,
      { store }
    );

    // Vérifier que les informations du produit sont rendues correctement
    expect(screen.getByText(/Boucles d'oreilles/i)).toBeInTheDocument();
    expect(screen.getByText(`: ${materials[1].name}`)).toBeInTheDocument();
    expect(screen.getByText(": 2")).toBeInTheDocument();
    expect(screen.getByText(": 50,00 €")).toBeInTheDocument();

    expect(screen.getByText(": Bracelet")).toBeInTheDocument();
    expect(screen.getByText(`: ${materials[2].name}`)).toBeInTheDocument();
    expect(screen.getByText(": 3")).toBeInTheDocument();
    expect(screen.getByText(": 30,00 €")).toBeInTheDocument();
  });
});
