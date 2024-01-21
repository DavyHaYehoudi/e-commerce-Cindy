import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminTrackingNumberCreate from "./AdminTrackingNumberCreate";
import useAdminTrackingNumberCreate from "./hooks/useAdminTrackingNumberCreate";
import productMock from "../../../../../../mocks/productMock"
import { render } from "../../../../../../test/utils"

jest.mock("./hooks/useAdminTrackingNumberCreate");

describe("AdminTrackingNumberCreate Component", () => {
  const mockUseAdminTrackingNumberCreate = useAdminTrackingNumberCreate;

  const client = { id: "1mongoDb" };
  const orderId = "1mongoDb";
  const trackingInfo = { trackingField: "", date: "" };
  const error = null;
  const isFormValid = true;
  const checkboxStates = {};
  const productStore = productMock; 
  const setError = jest.fn();
  const setTrackingInfo = jest.fn();
  const setSelectedProducts = jest.fn();
  const setCheckboxStates = jest.fn();
  const selectedProducts = [];
  const setTrackingNumberBoxOpen = jest.fn();
  const setIsFormValid = jest.fn();

  test("renders the component with the correct elements", () => {
    // Configurer le comportement simulé de useAdminTrackingNumberCreate
    mockUseAdminTrackingNumberCreate.mockReturnValue({
      articleNumber: {},
      setArticleNumber: jest.fn(),
      handleValidate: jest.fn(),
      handleCancel: jest.fn(),
    });

    render(
      <AdminTrackingNumberCreate
        client={client}
        orderId={orderId}
        trackingInfo={trackingInfo}
        error={error}
        isFormValid={isFormValid}
        checkboxStates={checkboxStates}
        productStore={productStore}
        setError={setError}
        setTrackingInfo={setTrackingInfo}
        setSelectedProducts={setSelectedProducts}
        setCheckboxStates={setCheckboxStates}
        selectedProducts={selectedProducts}
        setTrackingNumberBoxOpen={setTrackingNumberBoxOpen}
        setIsFormValid={setIsFormValid}
      />
    );

    // Vérifier si les éléments attendus sont rendus à l'écran
    expect(screen.getByLabelText("Numéro de suivi d'envoi :")).toBeInTheDocument();
    expect(screen.getByLabelText("Choisir une date d'envoi :")).toBeInTheDocument();
    expect(screen.getByTestId("articleNumberByProduct")).toBeInTheDocument();
    expect(screen.getByText("Valider")).toBeInTheDocument();
    expect(screen.getByText("Annuler")).toBeInTheDocument();
  });
});
