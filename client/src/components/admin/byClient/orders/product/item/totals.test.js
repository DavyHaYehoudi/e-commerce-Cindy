import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../../../../../test/utils";
import configureStore from "redux-mock-store";
import Totals from "./Totals";
import { formatPrice } from "../../../../../../helpers/utils/prices";

describe("Totals Component", () => {
  const mockStore = configureStore([]);
  const initialState = {
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
      ],
    },
    credits: {
      data: [
        {
          id: "idMongoDbGenerate1",
          productsId: 1,
          amount: 10,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
        {
          id: "idMongoDbGenerate2",
          productsId: 2,
          amount: 0,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
      ],
    },
  };

  const store = mockStore(initialState);

  test("renders the component with basic data", () => {
    const productsInfo = {
      refund: 10,
    };
    const productId = 1;
    const products = {
      id: 1,
    };

    render(
      <Totals
        productsInfo={productsInfo}
        productId={productId}
        products={products}
      />,
      { store }
    );
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
  });
  test("refund + creditTotal > 0 , with refund = 0 and creditTotal > 0", () => {
    const productsInfo = {
      refund: 0,
    };
    const productId = 1;
    const products = {
      id: 1,
    };

    render(
      <Totals
        productsInfo={productsInfo}
        productId={productId}
        products={products}
      />,
      { store }
    );
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(10))).toBeInTheDocument();
  });
  test("refund + creditTotal > 0 , with refund > 0 and creditTotal = 0", () => {
    const productsInfo = {
      refund: 2,
    };
    const productId = 1;
    const products = {
      id: 2,
    };

    render(
      <Totals
        productsInfo={productsInfo}
        productId={productId}
        products={products}
      />,
      { store }
    );
    const totalRefund = 2 * initialState.product.data[0].pricing.currentPrice;
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(totalRefund))).toBeInTheDocument();
  });
  test("refund + creditTotal = 0", () => {
    const productsInfo = {
      refund: 0,
    };
    const productId = 1;
    const products = {
      id: 2,
    };

    render(
      <Totals
        productsInfo={productsInfo}
        productId={productId}
        products={products}
      />,
      { store }
    );
    expect(screen.queryByText("Sortie :")).toBeNull();
  });
});
