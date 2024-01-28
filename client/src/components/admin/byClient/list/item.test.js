import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Item from "./Item";
import { render } from "../../../../test/utils";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";

// Fonction de mock pour le clic sur le client
const handleClientClickMock = jest.fn();

// Mock des détails du client
const clientDetailsMock = { "1mongoDb": true };

// Mock d'un client
const mockClient = {
  _id: "1mongoDb",
  firstName: "John",
  lastName: "Doe",
};

// Configuration initiale du store
const initialState = {
  orders: {
    data: [
      { _id: "1mongoDb", isClientNotified: true },
      { _id: "2mongoDb", isClientNotified: true },
      { _id: "3mongoDb", isClientNotified: true },
      { _id: "4mongoDb", isClientNotified: true },
      { _id: "5mongoDb", isClientNotified: false },
    ],
  },
};

// Configuration du store avec redux-mock-store
const mockStore = configureStore([]);
const store = mockStore(initialState);

// Test : rend le composant Item sans erreur
test("renders Item component without error", () => {
  render(
    <Item
      client={mockClient}
      handleClientClick={handleClientClickMock}
      clientDetails={clientDetailsMock}
    />
  );
  const listItem = screen.getByTestId(/client-row-1mongoDb/i);
  expect(listItem).toBeInTheDocument();
});

// Test : rend le composant Infos lorsque clientDetails est vrai
test("renders Infos component when clientDetails is true", () => {
  render(
    <Item
      client={mockClient}
      handleClientClick={handleClientClickMock}
      clientDetails={clientDetailsMock}
    />
  );
  const listItem = screen.getByTestId("client-row-1mongoDb");
  expect(listItem).toBeInTheDocument();

  const infosComponent = screen.getByTestId("infos-component-1mongoDb");
  expect(infosComponent).toBeInTheDocument();
});

// Groupe de tests pour le composant Item
describe("Item Component", () => {
  // Test : rend avec bulle de notification quand isAnyOrderClientNotified est vrai
  it("renders with notification bubble when isAnyOrderClientNotified is true", () => {
    const client = {
      _id: "2mongoDb",
      firstName: "Sophie",
      lastName: "Smith",
      orders: ["4mongoDb", "5mongoDb"],
    };

    render(
      <Item
        client={client}
        handleClientClick={handleClientClickMock}
        clientDetails={clientDetailsMock}
      />,
      { store }
    );

    const notificationBubble = screen.getByTestId("notification-bubble");
    expect(notificationBubble).toBeInTheDocument();
  });

  // Test : rend sans une bulle de notification quand isAnyOrderClientNotified est faux
  it("renders without notification bubble when isAnyOrderClientNotified is false", () => {
    const client = {
      _id: "1mongoDb",
      firstName: "John",
      lastName: "Doe",
      orders: ["1mongoDb", "2mongoDb", "3mongoDb"],
    };

    render(
      <Item
        client={client}
        handleClientClick={handleClientClickMock}
        clientDetails={clientDetailsMock}
      />,
      { store }
    );

    const notificationBubble = screen.queryByTestId("notification-bubble");
    expect(notificationBubble).not.toBeInTheDocument();
  });

  // Test : déclenche handleClientClick lors du clic sur l'en-tête du client
  it("triggers handleClientClick on client header click", () => {
    const client = {
      _id: "1mongoDb",
      firstName: "John",
      lastName: "Doe",
    };

    render(
      <Item
        client={client}
        handleClientClick={handleClientClickMock}
        clientDetails={clientDetailsMock}
      />,
      { store }
    );

    const clientHeader = screen.getByTestId(`client-name-${client._id}`);

    fireEvent.click(clientHeader);
    expect(handleClientClickMock).toHaveBeenCalledWith("1mongoDb");
  });
});
