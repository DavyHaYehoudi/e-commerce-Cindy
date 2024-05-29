import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrackingNumberList from ".";
import { render } from "../../../../test/utils";

// Mock data for testing
const mockTrackingNumber = {
  id: "abc123",
  value: "XYZ789",
  date: "2023-01-15 08:30",
  isAdmin: false,
};

const mockOrder = {
  id: 1,
};

describe("TrackingNumberList Component", () => {
  test("renders TrackingNumberList component with initial data", () => {
    render(<TrackingNumberList trk={mockTrackingNumber} order={mockOrder} />);

    // Vérifier que le composant TrackingNumberList est rendu
    expect(screen.getByTestId("tracking-number-list")).toBeInTheDocument();
  });

  test("renders correct tracking number type", () => {
    render(<TrackingNumberList trk={mockTrackingNumber} order={mockOrder} />);

    // Vérifier que le type de numéro de suivi est rendu correctement
    expect(
      screen.getByText("№ suivi de retour client : XYZ789")
    ).toBeInTheDocument();
  });

  test("renders deletion confirmation dialog when trash icon is clicked", () => {
    render(<TrackingNumberList trk={mockTrackingNumber} order={mockOrder} />);

    // Cliquer sur l'icône de la corbeille pour supprimer le numéro de suivi
    fireEvent.click(screen.getByLabelText("Supprimer ce numéro de suivi"));

    // Vérifier que la boîte de dialogue de confirmation de suppression est rendue
    expect(
      screen.getByText(
        "⚠️ La suppression de ce numéro de suivi est définitive !"
      )
    ).toBeInTheDocument();
  });

    test("cancels tracking number deletion when cancel button is clicked", () => {
      render(<TrackingNumberList trk={mockTrackingNumber} order={mockOrder} />);

      // Cliquer sur l'icône de la corbeille pour supprimer le numéro de suivi
      fireEvent.click(screen.getByLabelText("Supprimer ce numéro de suivi"));

      // Cliquer sur le bouton d'annulation
      fireEvent.click(screen.getByText("Annuler"));

      // Vérifier que la boîte de dialogue de confirmation de suppression n'est plus rendue
      expect(screen.queryByText("⚠️ La suppression de ce numéro de suivi est définitive !")).toBeNull();
    });
});
