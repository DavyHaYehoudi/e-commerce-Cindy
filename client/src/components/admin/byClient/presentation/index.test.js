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
};
const ordersMock =[] 
test("Client informations", () => {
  render(<Infos client={mockClient} orders={ordersMock} />);

  expect(
    screen.getByRole("heading", { level: 2, name: /Informations du client/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/prénom : John/i)).toBeInTheDocument();
  expect(screen.getByText(/nom : Doe/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /john\.doe@example\.com/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/Téléphone : 123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByText(/Adresse : 123 Main St/i)).toBeInTheDocument();
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

  const closeButton = screen.getByText("Fermer");
  expect(closeButton).toBeInTheDocument();
  fireEvent.click(closeButton);

  // Vérifie que la fonction handleClientClick a été appelée avec l'ID correct du client
  expect(handleClientClickMock).toHaveBeenCalledWith(mockClient.id);
});
