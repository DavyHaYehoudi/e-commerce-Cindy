import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "./";
import { render } from "../../../../../test/utils";

const order = {
    id: "2mongoDb",
    date: "2023-02-02 14:45",
    step: 1,
    isNextStepOrder: false,
    inTotalAmount: 25,
    outTotalAmount: 7,
    paymentMethod: { cardType: "Visa", last4Digits: "**** 1234" },
    trackingNumber: [],
    isClientNotified: true,
    lastSentDateToClient: null,
    productsByOrder: ["3mongoDb"], 
};
describe("Item Component", () => {
  test("renders Item component correctly", () => {
    render(
      <Item
        client={{ id: "1mongoDb" }}
        order={order} 
        orderIndex={1}
        isClientNotified={false}
        lastSentDateToClient={null}
        step={1}
      />
    );

    // Check if the component renders without errors
    const itemComponent = screen.getByTestId(`item-component-${order.id}`);
    expect(itemComponent).toBeInTheDocument();
  });
});
