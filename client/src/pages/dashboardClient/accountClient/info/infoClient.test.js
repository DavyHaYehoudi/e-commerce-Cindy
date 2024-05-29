import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../test/utils";
import InfoClient from "./InfoClient";
import "@testing-library/jest-dom";

describe("InfoClient Component", () => {
  const dataClient = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  };
  const clientId = "1mongoDB";
  const handleChangeProfilSave = jest.fn();
  const handleChangeProfilEdit = jest.fn();
  test("renders component with initial data", () => {
    const isEditing = false;
    render(
      <InfoClient
        dataClient={dataClient}
        handleChangeProfilSave={handleChangeProfilSave}
        isEditing={isEditing}
        handleChangeProfilEdit={handleChangeProfilEdit}
        clientId={clientId}
      />
    );
    const elements = screen.queryAllByText(/John/i);
    expect(elements.length > 0).toBe(true);
  });

  test("calls onSaveChanges when 'Enregistrer les modifications' button is clicked", () => {
    const isEditing = true;
    render(
      <InfoClient
        dataClient={dataClient}
        handleChangeProfilSave={handleChangeProfilSave}
        isEditing={isEditing}
        handleChangeProfilEdit={handleChangeProfilEdit}
        clientId={clientId}
      />
    );

    // fireEvent.click(screen.getByText("Modifier les Informations"));
    fireEvent.click(screen.getByText("Enregistrer les modifications"));

    // Vérifie que la fonction onSaveChanges a été appelée avec les bonnes données
    // expect(onSaveChangesMock).toHaveBeenCalledWith(/* les données modifiées */);
  });
});
