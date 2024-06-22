import React from "react";
import { screen } from "@testing-library/react";
import {render} from "../../test/utils"
import "@testing-library/jest-dom";
import ShoppingCart from ".";

describe("ShoppingCart component", () => {
  test("renders ShoppingCart component", () => {
    render(<ShoppingCart />);
    expect(screen.getByRole("heading",{level:1,name:/panier/i})).toBeInTheDocument()
    expect(screen.getByTestId("shoppingCart-content")).toBeInTheDocument();
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();
  });
});
