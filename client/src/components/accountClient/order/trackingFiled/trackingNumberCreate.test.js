import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrackingNumberCreate from "./TrackingNumberCreate";
import { render } from "../../../../test/utils";

describe("TrackingNumberCreate component", () => {
  it("renders without errors", () => {
    render(
      <TrackingNumberCreate orderId={1} setTrackingNumberBoxOpen={() => {}} />
    );
    const component = screen.getByTestId("ClientTrackingNumberCreate");
    expect(component).toBeInTheDocument();
  });

  it("handles input change and displays error for trackingField", () => {
    render(
      <TrackingNumberCreate orderId={1} setTrackingNumberBoxOpen={() => {}} />
    );

    const trackingFieldInput = screen.getByLabelText(
      "Numéro de suivi d'envoi :"
    );
    fireEvent.change(trackingFieldInput, { target: { value: "" } });
    // Cliquez sur le bouton Valider
    const validateButton = screen.getByText(/Valider/i);
    fireEvent.click(validateButton);

    const errorMessage = screen.getByText(
      /Veuillez définir un numéro de suivi/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("handles input change and displays error for date", () => {
    render(
      <TrackingNumberCreate orderId={1} setTrackingNumberBoxOpen={() => {}} />
    );

    const dateInput = screen.getByLabelText("Choisir une date d'envoi :");
    fireEvent.change(dateInput, { target: { value: "" } });
    // Cliquez sur le bouton Valider
    const validateButton = screen.getByText(/Valider/i);
    fireEvent.click(validateButton);

    const errorMessage = screen.getByText(/Veuillez choisir une date d'envoi/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
