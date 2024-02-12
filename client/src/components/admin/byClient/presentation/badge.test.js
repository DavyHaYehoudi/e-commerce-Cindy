import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../../test/utils";
import "@testing-library/jest-dom";
import Badge from "./Badge";
import { getOrderStepProperty } from "../../../../helpers/constants/orderStep";

import configureStore from "redux-mock-store";

describe("Badge Component", () => {
  const initialState = {
    orders: {
      data: [
        { _id: "1mongoDb" },
        { _id: "2mongoDb" },
        { _id: "3mongoDb" },
        { _id: "4mongoDb" },
        { _id: "5mongoDb" },
      ],
      isClientNotified: ["5mongoDb"],
    },
  };
  const setSelectedOrderIdMock = jest.fn();

  // Configuration du store avec redux-mock-store
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  test("renders badge information correctly", () => {
    render(
      <Badge
        step={3}
        orderIds={[]}
        orderId={"4mongoDb"}
        count={3}
        setSelectedOrderId={setSelectedOrderIdMock}
      />,
      { store }
    );
    const orderName = getOrderStepProperty(3).name;
    expect(screen.getByText(new RegExp(orderName))).toBeInTheDocument();
  });

  test("calls handleClick when badge is clicked", () => {
    render(
      <Badge
        step={2}
        orderIds={[1, 2, 3]}
        orderId={1}
        count={3}
        setSelectedOrderId={setSelectedOrderIdMock}
      />
    );
    const orderName = getOrderStepProperty(2).name;
    fireEvent.click(screen.getByText(new RegExp(orderName)));

    expect(setSelectedOrderIdMock).toHaveBeenCalledWith([1, 2, 3]);
  });

  test("renders notification bubble when isClientNotifiedForThisOrder is false", () => {
    render(
      <Badge
        step={3}
        orderIds={[]}
        orderId={"5mongoDb"}
        count={3}
        setSelectedOrderId={setSelectedOrderIdMock}
      />,
      { store }
    );

    expect(screen.getByTestId("notification-bubble")).toBeInTheDocument();
  });

  test("does not render notification bubble when isClientNotifiedForThisOrder is true", () => {
    render(
      <Badge
        step={3}
        orderIds={[]}
        orderId={"1mongoDb"}
        count={3}
        setSelectedOrderId={setSelectedOrderIdMock}
      />,
      { store }
    );

    expect(screen.queryByTestId("notification-bubble")).toBeNull();
  });
});
