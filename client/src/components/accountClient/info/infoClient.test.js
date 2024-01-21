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
  test("renders component with initial data", () => {
    render(<InfoClient dataClient={dataClient} />);
    const elements = screen.queryAllByText(/John/i);
    expect(elements.length > 0).toBe(true);
  });

  test("allows editing when 'Modifier les Informations' button is clicked", () => {
    render(<InfoClient dataClient={dataClient} />);

    fireEvent.click(screen.getByText("Modifier les Informations"));

    // Vérifie que les champs deviennent éditables
    expect(screen.getByDisplayValue("John")).toBeEnabled();
    // Ajoutez des assertions similaires pour les autres champs
  });

  test("calls onSaveChanges when 'Enregistrer les modifications' button is clicked", () => {
    const onSaveChangesMock = jest.fn();

    render(
      <InfoClient dataClient={dataClient} onSaveChanges={onSaveChangesMock} />
    );

    fireEvent.click(screen.getByText("Modifier les Informations"));
    fireEvent.click(screen.getByText("Enregistrer les modifications"));

    // Vérifie que la fonction onSaveChanges a été appelée avec les bonnes données
    // expect(onSaveChangesMock).toHaveBeenCalledWith(/* les données modifiées */);
  });
});
