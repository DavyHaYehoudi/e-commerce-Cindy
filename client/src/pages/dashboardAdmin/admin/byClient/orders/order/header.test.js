import React from "react";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { render } from "../../../../../test/utils";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  const order = {
    date: new Date(),
  };

  const handleSendToClient = jest.fn();
  const step = "someStep";
  const client = "someClient";
  const isClientNotified = true;
  const lastSentDateToClient = new Date();

  it("renders without crashing", () => {
    render(
      <Header
        order={order}
        handleSendToClient={handleSendToClient}
        step={step}
        client={client}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />
    );
    expect(screen.getByTestId("admin-order-item-header")).toBeInTheDocument(); 
  });

  it("displays the order date or 'Date NC' if not available", () => {
    render(
      <Header
        order={{ date: undefined }}
        handleSendToClient={handleSendToClient}
        step={step}
        client={client}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />
    );
    expect(screen.getByText(/Date NC/i)).toBeInTheDocument();
  });

  it("renders OrderStep component", () => {
    render(
      <Header
        order={order}
        handleSendToClient={handleSendToClient}
        step={step}
        client={client}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient} 
      />
    );
    expect(screen.getByTestId("order-step")).toBeInTheDocument();
  });

  it("renders ActionsDropdown component", () => {  
    render(
      <Header
        order={order}
        handleSendToClient={handleSendToClient}
        step={step}
        client={client}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />
    );
    expect(screen.getByTestId("actions-dropdown")).toBeInTheDocument();
  });
});
