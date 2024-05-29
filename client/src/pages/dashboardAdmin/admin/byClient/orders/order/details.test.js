import React from "react";
import { screen } from "@testing-library/react";
import Details from "./Details";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { render } from "../../../../../test/utils"
import "@testing-library/jest-dom";

describe("Details Component", () => {
  const order = {
    inTotalAmount: 100,
  };
  const orderId = "someOrderId";

  it("renders without crashing", () => {
    render(<Details order={order} orderId={orderId} />);
    expect(screen.getByTestId("in-total")).toBeInTheDocument();
  });

  it("displays the total amount of the order", () => {
    render(<Details order={order} orderId={orderId} />);
    const totalTextElement = screen.getByTestId("in-total");
    expect(totalTextElement).toHaveTextContent(`Total de la commande : ${formatPrice(order.inTotalAmount)}`);
  });

  it("displays 'Total NC' if inTotalAmount is not available", () => {
    render(<Details order={{}} orderId={orderId} />);
    const totalTextElement = screen.getByTestId("in-total");
    expect(totalTextElement).toHaveTextContent(/Total de la commande : Total NC/i);
  });

  it("does not display outgoing items if outTotalAmount is not available", () => {
    const orderWithNoOutTotalAmount = {
        outTotalAmount: null,
      };
      const orderWithZeroOutTotalAmount = {
        outTotalAmount: 0,
      };
      const orderId = "3mongoDb";
  
      // Test when outTotalAmount is not available
      render(<Details order={orderWithNoOutTotalAmount} orderId={orderId} />);
      const outTotalNotAvailable = screen.queryByTestId("out-total");
      expect(outTotalNotAvailable).not.toBeInTheDocument();
  
      // Test when outTotalAmount is 0
      render(<Details order={orderWithZeroOutTotalAmount} orderId={orderId} />);
      const outTotalZero = screen.queryByTestId("out-total");
      expect(outTotalZero).not.toBeInTheDocument();
    });
});
