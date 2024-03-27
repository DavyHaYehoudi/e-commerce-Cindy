import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { render } from "../../../../../../test/utils";
import Header from "./Header";
import { sumPriceArticle } from "../../../../../../helpers/utils/prices";

const mockStore = configureStore([]);

describe("Header Component", () => {
  const initialState = {
    credit: {
      data: [
        {
          _id: "idMongoDbGenerate1",
          orderProductsId: 1,
          amount: 10,
          code: "456JHUIRJNBdfdf",
          dateExpire: "2023-04-05 09:55",
        },
      ],
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
      ],
    },
  };

  const store = mockStore(initialState);

  test("renders the component with basic data", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 1,
      credit: true,
    };
    const material = 0;
    const quantity = 3;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    // Add assertions based on your component's output
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByText(/Boucles d'oreilles/i)).toBeInTheDocument();
  });
  test("display ECHANGE,REMBOURSEMENT,AVOIR", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 1,
      credit: true,
    };
    const material = 0;
    const quantity = 3;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    expect(screen.getByText(("ECHANGE :"))).toBeInTheDocument();
    expect(screen.getByText(("REMBOURSEMENT :"))).toBeInTheDocument();
    expect(screen.getByText(("AVOIR :"))).toBeInTheDocument();
  });
  test("display ECHANGE,REMBOURSEMENT and not AVOIR", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 1,
      credit: false,
    };
    const material = 0;
    const quantity = 3;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    expect(screen.getByText(("ECHANGE :"))).toBeInTheDocument();
    expect(screen.getByText(("REMBOURSEMENT :"))).toBeInTheDocument();
    expect(screen.queryByText(("AVOIR :"))).toBeNull();
  });
  test("display ECHANGE and not REMBOURSEMENT neither AVOIR", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 0,
      credit: false,
    };
    const material = 0;
    const quantity = 3;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    expect(screen.getByText(("ECHANGE :"))).toBeInTheDocument();
    expect(screen.queryByText(("REMBOURSEMENT :"))).toBeNull();
    expect(screen.queryByText(("AVOIR :"))).toBeNull();
  });

  test("renders the correct price for a single item", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 1,
      credit: false,
    };
    const material = 0;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();
    const quantity = 1;
    const price = initialState.product.data[0].pricing.currentPrice

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    expect(screen.getByText("1 x 50,00 € = 50,00 €")).toBeInTheDocument();
    expect(screen.getByText(sumPriceArticle(quantity,price))).toBeInTheDocument(); 
  });

  test("renders the correct price for multiple items", () => {
    const orderProductsInfo = {
      exchange: 1,
      refund: 3,
      credit: false,
    };
    const material = 0;
    const productsId = 1;
    const orderProducts = {
      _id: 1,
    }; 
    const isTagProductExisted = true;
    const toggleActions = jest.fn();
    const quantity = 3;
    const price = initialState.product.data[0].pricing.currentPrice

    render(
      <Header
        interaction={{ isActionsOpen: false }}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={initialState.product.data}
        toggleActions={toggleActions}
      />,
      { store }
    );

    expect(screen.getByText("3 x 50,00 € = 150,00 €")).toBeInTheDocument();
    expect(screen.getByText(sumPriceArticle(quantity,price))).toBeInTheDocument(); 
  }); 
});
 