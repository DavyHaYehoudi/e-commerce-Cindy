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
      productsByOrder: [
        {
          productId: 1,
          quantity: 2,
          material: 1,
        },
        {
          productId: 2,
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
    render(<Item productsByOrder={[1]} isReturnProduct={false} />, { store });

    // Vérifier que le composant Item est rendu
    expect(screen.getByTestId("order-items-user-account")).toBeInTheDocument();
  });

  test("renders product information correctly", () => {
    render(<Item productsByOrder={[1, 2]} isReturnProduct={false} />, { store });
 
    // Vérifier que les informations du produit sont rendues correctement
    expect(
      screen.getByText("Nom du produit : Boucles d'oreilles")
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Matériau : ${materials[1].name}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Quantité : 2")).toBeInTheDocument();
    expect(screen.getByText("Prix unitaire : 50,00 €")).toBeInTheDocument();

    expect(screen.getByText("Nom du produit : Bracelet")).toBeInTheDocument();
    expect(
      screen.getByText(`Matériau : ${materials[2].name}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Quantité : 3")).toBeInTheDocument();
    expect(screen.getByText("Prix unitaire : 30,00 €")).toBeInTheDocument();
  });
});
