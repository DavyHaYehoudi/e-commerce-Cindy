import React from "react";
import "@testing-library/jest-dom";
import { screen,fireEvent } from "@testing-library/react";
import AccountClient from "./AccountClient";
import { render } from "../test/utils";

describe("AccountClient Component", () => {
  test("renders AccountClient component with initial data", () => {
    render(<AccountClient />);
    expect(screen.getByTestId("account-dashboard")).toBeInTheDocument()
    expect(screen.getByRole("heading",{level:2,name:"Historique des commandes"})).toBeInTheDocument()
    expect(screen.getByRole("heading",{level:3,name:"Commandes en cours"})).toBeInTheDocument() 
    expect(screen.getByRole("heading",{level:3,name:"Commandes expédiées"})).toBeInTheDocument() 
  });
});
describe("AccountClient Component - OrderItemsContainer", () => {
    test("renders OtherOrders when 'enCours' tab is active", () => {  
      render(<AccountClient />);
  
      // Simuler le clic sur l'onglet "Commandes en cours"
      fireEvent.click(screen.getByText("Commandes en cours"));
  
      // Vérifier que le composant OtherOrders est rendu
      expect(screen.getByTestId(/list-orders/i)).toBeInTheDocument();
    });
  
    test("renders DeliveredOrders when 'expediees' tab is active", () => {
      render(<AccountClient />);
  
      // Simuler le clic sur l'onglet "Commandes expédiées"
      fireEvent.click(screen.getByText("Commandes expédiées"));
  
      // Vérifier que le composant DeliveredOrders est rendu
      expect(screen.getByTestId(/list-orders/i)).toBeInTheDocument();
    });
  }); 