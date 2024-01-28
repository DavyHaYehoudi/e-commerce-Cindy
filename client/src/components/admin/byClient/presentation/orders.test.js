import React from "react";
import { screen } from "@testing-library/react";
import Orders from "./Orders";
import { render } from "../../../../test/utils";
import "@testing-library/jest-dom";
import { orderStep } from "../../../../constants/orderStep";

const ordersProps1 = [{ id: "1mongoDb", step: 0 }, { step: 1 }, { step: 2 }];
const ordersProps2 = [{ step: 3 }, { step: 4 }];
const ordersProps3 = [{ step: 5 }, { step: 6 }];
const ordersProps4 = [{ step: 6 }];

const clientProps1 = { id: "1mongoDb", totalOrders: 3, totalOrderValue: 325 };
const setSelectedOrderIdMock = jest.fn();

describe("Orders Component without Item Component", () => {
  test("renders Orders component without error", () => {
    render(
      <Orders
        orders={ordersProps1}
        client={clientProps1}
        setSelectedOrderId={setSelectedOrderIdMock}
        selectedOrderId={null}
      />
    );
    const header = screen.getByRole("heading", {
      level: 2,
      name: /Historique des commandes/i,
    });
    expect(header).toBeInTheDocument();
  });
  test("does not render selected items when selectedOrderId is false", () => {
    render(
      <Orders
        orders={ordersProps1}
        client={clientProps1}
        setSelectedOrderId={setSelectedOrderIdMock}
        selectedOrderId={null}
      />
    );
    expect(screen.queryByTestId("selected-items")).toBeNull();
  });
  test("renders orders information correctly", () => {
    render(
      <Orders
        orders={ordersProps1}
        client={clientProps1}
        setSelectedOrderId={setSelectedOrderIdMock}
        selectedOrderId={null}
      />
    );

    expect(
      screen.getByText(/Total\s*des\s*commandes\s*:\s*3/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/325,00 €/i)).toBeInTheDocument();
  });
  describe("All badges steps", () => {
    test("steps orderStep[0],orderStep[1],orderStep[2]", () => {
      render(
        <Orders
          orders={ordersProps1}
          client={clientProps1}
          setSelectedOrderId={setSelectedOrderIdMock}
          selectedOrderId={null}
        />
      );

      expect(
        screen.getByText(new RegExp(`${orderStep[0].name}.*`, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${orderStep[1].name}.*`, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${orderStep[2].name}.*`, "i"))
      ).toBeInTheDocument();
    });
    test("step orderStep[3],orderStep[4]", () => {
      render(
        <Orders
          orders={ordersProps2}
          client={""}
          setSelectedOrderId={setSelectedOrderIdMock}
          selectedOrderId={null}
        />
      );

      expect(
        screen.getByText(new RegExp(`${orderStep[3].name}.*`, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${orderStep[4].name}.*`, "i"))
      ).toBeInTheDocument();
    });

    test("step and orderStep[5],orderStep[6]", () => {
      render(
        <Orders
          orders={ordersProps3}
          client={""}
          setSelectedOrderId={setSelectedOrderIdMock}
          selectedOrderId={null}
        />
      );

      expect(
        screen.getByText(new RegExp(`${orderStep[5].name}.*`, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${orderStep[6].name}.*`, "i"))
      ).toBeInTheDocument();
    });
    test("step and orderStep[7]", () => {
      render(
        <Orders
          orders={ordersProps4}
          client={""}
          setSelectedOrderId={setSelectedOrderIdMock}
          selectedOrderId={null}
        />
      );
      expect(
        screen.getByText(new RegExp(`${orderStep[6].name}.*`, "i"))
      ).toBeInTheDocument();
    });
  });
});

describe("Orders Component with Item Component", () => {
  const ordersProps = [
    { _id: "1", step: 0 },
    { _id: "2", step: 1 },
    { _id: "3", step: 2 },
  ];
  const clientProps = { id: "1mongoDb", totalOrders: 3, totalOrderValue: 325 };
  test("renders Item component when selectedOrderId has an id", () => {
    render(
      <Orders
        orders={ordersProps}
        client={clientProps}
        setSelectedOrderId={setSelectedOrderIdMock}
        selectedOrderId={["3"]}
      />
    );

    expect(screen.getByTestId(/selected-items/i)).toBeInTheDocument();
    expect(screen.getByTestId(`item-component-3`)).toBeInTheDocument();
  });
});
