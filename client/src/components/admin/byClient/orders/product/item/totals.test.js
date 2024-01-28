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
          _id: 1,
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
    credit: {
      data: [
        {
          _id: "idMongoDbGenerate1",
          productsByOrderId: 1,
          amount: 10,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
        {
          _id: "idMongoDbGenerate2",
          productsByOrderId: 2,
          amount: 0,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
      ],
    },
  };

  const store = mockStore(initialState);

  test("renders the component with basic data", () => {
    const productsByOrderInfo = {
      refund: 10,
    };
    const productId = 1;
    const productsByOrder = {
      _id: 1,
    };

    render(
      <Totals
        productsByOrderInfo={productsByOrderInfo}
        productId={productId}
        productsByOrder={productsByOrder}
      />,
      { store }
    );
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
  });
  test("refund + creditTotal > 0 , with refund = 0 and creditTotal > 0", () => {
    const productsByOrderInfo = {
      refund: 0,
    };
    const productId = 1;
    const productsByOrder = {
      _id: 1,
    };

    render(
      <Totals
        productsByOrderInfo={productsByOrderInfo}
        productId={productId}
        productsByOrder={productsByOrder}
      />,
      { store }
    );
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(10))).toBeInTheDocument();
  });
  test("refund + creditTotal > 0 , with refund > 0 and creditTotal = 0", () => {
    const productsByOrderInfo = {
      refund: 2,
    };
    const productId = 1;
    const productsByOrder = {
      _id: 2,
    };

    render(
      <Totals
        productsByOrderInfo={productsByOrderInfo}
        productId={productId}
        productsByOrder={productsByOrder}
      />,
      { store }
    );
    const totalRefund = 2 * initialState.product.data[0].pricing.currentPrice;
    expect(screen.getByText("Sortie :")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(totalRefund))).toBeInTheDocument();
  });
  test("refund + creditTotal = 0", () => {
    const productsByOrderInfo = {
      refund: 0,
    };
    const productId = 1;
    const productsByOrder = {
      _id: 2,
    };

    render(
      <Totals
        productsByOrderInfo={productsByOrderInfo}
        productId={productId}
        productsByOrder={productsByOrder}
      />,
      { store }
    );
    expect(screen.queryByText("Sortie :")).toBeNull();
  });
});
