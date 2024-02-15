import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../../../test/utils";
import List from ".";
import configureStore from "redux-mock-store";

test("renders List component correctly", () => {
  const mockHandleClientClick = jest.fn();
  const mockClientDetails = {};
  render(
    <List
      handleClientClick={mockHandleClientClick}
      clientDetails={mockClientDetails}
    />
  );

  expect(
    screen.getByRole("heading", { level: 2, name: "Liste des clients" })
  ).toBeInTheDocument();
});

const mockStore = configureStore([]);
test("Renders correctly Item component for each client and respects the pagination limited to 5", () => {
  const handleClientClickMock = jest.fn();
  const clientDetailsMock = {};

  const initialState = {
    clients: {
      data: [
        { _id: 1, firstName: "John", lastName: "Doe" },
        { _id: 2, firstName: "Jane", lastName: "Doe" },
        { _id: 3, firstName: "Eric", lastName: "Cartouche" },
        { _id: 4, firstName: "Marguerite", lastName: "Douglas" },
        { _id: 5, firstName: "Noemi", lastName: "Center" },
        { _id: 6, firstName: "Stephan", lastName: "Colt" },
      ],
    },
    orders: {
      isClientNotified:[]
    }
  };
  const store = mockStore(initialState);

  render(
    <List
      handleClientClick={handleClientClickMock}
      clientDetails={clientDetailsMock}
    />,
    { store }
  );

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByText("Eric Cartouche")).toBeInTheDocument();
  expect(screen.getByText("Marguerite Douglas")).toBeInTheDocument();
  expect(screen.getByText("Noemi Center")).toBeInTheDocument();

  //Render only 5 because of Pagination limited to 5
  expect(screen.queryByText("Stephan Colt")).not.toBeInTheDocument();
});
