import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import ToggleButtonNote from "./ToggleButtonNote";
import { render } from "../../../../../test/utils";
import "@testing-library/jest-dom";
import * as actions from "../../../../../constants/productsActions";

jest.mock("./item/action/hooks/useNoteValueHandler", () => ({
  useNoteValueHandler: (productId, actions) => {
    return {
      handleChangeNoteValue: jest.fn(),
    };
  },
}));

const productsInfo = {
  note: "Some initial note",
};

render(
  <ToggleButtonNote
    productsInfo={productsInfo}
    productId="1mongoDb"
    actions={actions}
  />
);
describe("ToggleButtonNote Component", () => {
  test("renders ToggleButtonNote component correctly", () => {
    // Vérifie si le bouton ToggleButtonNote est rendu correctement
    expect(screen.getByText("Note")).toBeInTheDocument();

    // Vérifie si le champ de texte initial est caché au début
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    // Simule un clic sur le bouton ToggleButtonNote pour afficher le champ de texte
    fireEvent.click(screen.getByText("Note"));

    // Vérifie si le champ de texte est maintenant rendu
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Simule un deuxième clic sur le bouton ToggleButtonNote pour cacher le champ de texte
    fireEvent.click(screen.getByText("Fermer"));

    // Vérifie si le champ de texte est à nouveau caché
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
describe("Integration Test - ToggleButtonNote", () => {
  test('displays textarea content when clicking on the "Note" toggle button', () => {
    render(
      <ToggleButtonNote
        productsInfo={productsInfo}
        productId="1mongoDb"
        actions={actions}
      />
    );
    // Recherche du bouton 'Note' et vérification de son existence
    const noteToggleButton = screen.getByText("Note");
    expect(noteToggleButton).toBeInTheDocument();

    // Simule un clic sur le bouton 'Note' pour afficher la textarea
    fireEvent.click(noteToggleButton);

    // Recherche de la textarea et vérification de son existence
    const noteTextarea = screen.getByRole("textbox");
    expect(noteTextarea).toBeInTheDocument();

    // Vérification du contenu initial de la note dans la textarea
    expect(noteTextarea).toHaveValue("Some initial note");
  });
});
