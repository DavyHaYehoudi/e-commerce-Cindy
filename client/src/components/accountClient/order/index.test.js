import React from "react";
import { screen, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from ".";
import { render } from "../../../test/utils";

// Mock data for testing
const mockOrderHistory = [
  {
    _id: 1,
    createdAt: "2023-01-15 08:30",
    step: 0,
    trackingNumber: [  {
      id: "nndkdh4444aksdjfls",
      isAdmin: true,
      value: "102938MAUCBQPDMN",
      date: "2013-01-15 08:30",
      productsByOrder: [
        { id: "vzxcvzxczoio354", productId:"2mongoDb", articlesNumber: 1,material:0 },
        { id: "vzxcvzxczoio355", productId:"1mongoDb", articlesNumber: 2 ,material:1},
      ],
    },
    {
      id: "fasjkj54lldjfakjd0",
      isAdmin: false,
      value: "JND&HDYS#@FJKS",
      date: "2014-01-15 08:30",
      productsByOrder: [],
    },],
    paymentMethod: { cardType: "Visa", last4Digits: "**** **** **** 1234" },
    inTotalAmount: 220,
  },
]; 

describe("List Component", () => {
  test("renders List component with initial data", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);

    // Vérifier que le composant List est rendu
    expect(screen.getByTestId("list-orders")).toBeInTheDocument();
  });
  test("renders date with correct format", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(
      screen.getByText(new RegExp("15/01/2023 08:30"))
    ).toBeInTheDocument();
  });
  test("renders inTotalAmount", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(
      screen.getByText(new RegExp(": 220,00 €"))
    ).toBeInTheDocument();
  });

  test("renders order items when showOrderItems is true", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    // Simuler le clic sur le bouton ToggleButton pour afficher les articles
    fireEvent.click(screen.queryAllByText("Afficher les articles")[0]);
    // Vérifier que le composant Item est rendu
    expect(screen.getByTestId("order-items-user-account")).toBeInTheDocument();
  });

  test("renders tracking numbers when they exist", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(screen.getByText(/№ suivi de retour client : JND&HDYS#@FJKS/i)).toBeInTheDocument();
    expect(screen.getByText(/№ suivi de commande : 102938MAUCBQPDMN/i)).toBeInTheDocument();
  });
  
  test("does not render '№ suivi de commande en attente d'être communiqué' when tracking numbers exist", () => {
    const orderHistoryWithTracking = [
      {
        id: 1,
        date: "2023-01-15 08:30",
        step: 0,
        trackingNumber: [{id:789}],
        paymentMethod: { cardType: "Visa", last4Digits: "**** **** **** 1234" },
        inTotalAmount: 220,
      }, 
    ];
  
    render(<List orderHistory={orderHistoryWithTracking} filter={() => true} />);
    // Vérifier que le message n'est pas rendu
    expect(
      screen.queryByText("№ suivi de commande en attente d'être communiqué")
    ).toBeNull();
  });
  test("does render '№ suivi de commande en attente d'être communiqué' when tracking numbers doesn't exist", () => {
    const orderHistoryWithTracking = [
      {
        id: 1,
        date: "2023-01-15 08:30",
        step: 0,
        trackingNumber: [],
        paymentMethod: { cardType: "Visa", last4Digits: "**** **** **** 1234" },
        inTotalAmount: 220,
      }, 
    ];
  
    render(<List orderHistory={orderHistoryWithTracking} filter={() => true} />);
    // Vérifier que les numéros de suivi existants sont rendus
    expect(
      screen.getByText("№ suivi de commande en attente d'être communiqué")
    ).toBeInTheDocument();
  });
});
