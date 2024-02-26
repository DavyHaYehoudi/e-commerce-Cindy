import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Infos from ".";
import { render } from "../../../../test/utils";
import "@testing-library/jest-dom";

const mockClient = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  shippingAddress: "123 Main St",
  createdAt:"2023-01-15T08:30:00.000Z"
};
const ordersMock =[] 
test("Client informations", () => {
  render(<Infos client={mockClient} orders={ordersMock} />);

  expect(
    screen.getByRole("heading", { level: 2, name: /Informations du client/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/: John/i)).toBeInTheDocument(); 
  expect(screen.getByText(/: Doe/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /john\.doe@example\.com/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/: 123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByText(/: 123 Main St/i)).toBeInTheDocument();
  expect(screen.getByText(": 15/01/2023 09:30")).toBeInTheDocument();
});

test("handles preferences toggle button click", () => {
  render(<Infos client={mockClient} orders={ordersMock} />);

  const toggleButton = screen.getByText("Afficher les préférences");
  expect(toggleButton).toBeInTheDocument();
  fireEvent.click(toggleButton);

  const preferencesContent = screen.getByText("Fermer les préférences");
  expect(preferencesContent).toBeInTheDocument();
});
test("handles close button click", () => {
  const handleClientClickMock = jest.fn();
  render(
    <Infos
      client={mockClient}
      orders={ordersMock}
      handleClientClick={handleClientClickMock}
    />
  );

  const closeButton = screen.getByText("Fermer la fiche de John Doe");
  expect(closeButton).toBeInTheDocument();
  fireEvent.click(closeButton);

  // Vérifie que la fonction handleClientClick a été appelée avec l'ID correct du client
  expect(handleClientClickMock).toHaveBeenCalledWith(mockClient._id);
});
