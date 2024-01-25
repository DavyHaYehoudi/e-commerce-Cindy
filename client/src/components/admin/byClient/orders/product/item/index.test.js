import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { render } from "../../../../../../test/utils";
import Main from ".";
import { materials } from "../../../../../../constants/materials";

describe("Main Component", () => {
  const productsByOrder = { id: 1, productId: 2, quantity: 2, material: 0 };
  const materialName = materials[0].name;

  const mockState = {
    orders: {
      data: [{ id: 1, productsByOrder: [1, 2] }],
    },
    productsByOrder: {
      data: [
        { id: 1, productId: 1, quantity: 2 },
        { id: 2, productId: 2, quantity: 1 },
      ],
    },
    product: {
      data: [
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
      ],
    },
  };

  // Configuration du store avec redux-mock-store
  const mockStore = configureStore([]);
  const store = mockStore(mockState);
  const client = {
    id: 1,
  };
  test("renders the component with basic data", () => {
    render(<Main productsByOrder={productsByOrder} client={client} orderId={1} />, { store });

    // Vérifiez que le composant est rendu avec les données de base
    expect(screen.getByTestId("product-content-2")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(materialName))).toBeInTheDocument();
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });
});
