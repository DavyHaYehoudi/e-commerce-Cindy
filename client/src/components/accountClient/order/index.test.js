import React from "react";
import { screen, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from ".";
import { render } from "../../../test/utils";

// Mock data for testing
const mockOrderHistory = [
  {
    id: 1,
    date: "2023-01-15 08:30",
    step: 0,
    trackingNumber: [  {
      id: "nndkdh4444aksdjfls",
      isAdmin: true,
      value: "102938MAUCBQPDMN",
      date: "2013-01-15 08:30",
      productsByOrder: [
        { id: "vzxcvzxczoio354", productId:"2mongoDb", articlesNumber: 1 },
        { id: "vzxcvzxczoio355", productId:"1mongoDb", articlesNumber: 2 },
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
  {
    id: 2,
    date: "2023-02-15 09:30",
    step: 3,
    trackingNumber: [],
    paymentMethod: {
      cardType: "Mastercard",
      last4Digits: "**** **** **** 5678",
    },
    inTotalAmount: 25,
  },
  {
    id: 3,
    date: "2023-03-15 10:30",
    step: 2,
    trackingNumber: [ {
      id: "qpanfheifb48fn40n40",
      isAdmin: false,
      value: "JNFDNDM987MND*",
      date: "2023-01-10 08:30",
      productsByOrder: [{ id: "sdfg222uuuhreh", productId:"2mongoDb", articlesNumber: 1 }],
    },
    {
      id: "lrjfsurpeoiwu08098",
      isAdmin: true,
      value: "10b2938MAUCBQPD",
      date: "2023-01-09 08:35",
      productsByOrder: [
        { id: "1234123142312f", productId:"1mongoDb", articlesNumber: 1 },
        { id: "345634563456h", productId:"2mongoDb", articlesNumber: 1 },
      ],
    },], 
    paymentMethod: { cardType: "Express", last4Digits: "**** **** **** 9012" },
    inTotalAmount: 80,
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
    expect(
      screen.getByText(new RegExp("15/02/2023 09:30"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("15/03/2023 10:30"))
    ).toBeInTheDocument();
  });
  test("renders inTotalAmount", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(
      screen.getByText(new RegExp("Prix total : 220,00 €"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("Prix total : 25,00 €"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("Prix total : 80,00 €"))
    ).toBeInTheDocument();
  });
  test("renders paymentMethod", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(screen.getByText("Moyen de paiement : Visa")).toBeInTheDocument();
    expect(
      screen.getByText("Moyen de paiement : Mastercard")
    ).toBeInTheDocument();
    expect(screen.getByText("Moyen de paiement : Express")).toBeInTheDocument();
    expect(
      screen.getByText("Se terminant par : **** **** **** 1234")
    ).toBeInTheDocument();
  });

  test("renders order items when showOrderItems is true", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    // Simuler le clic sur le bouton ToggleButton pour afficher les articles
    fireEvent.click(screen.queryAllByText("Afficher les articles")[0]);
    // Vérifier que le composant Item est rendu
    expect(screen.getByTestId("order-items-user-account")).toBeInTheDocument();
  });

  test("renders 'Ajouter un numéro de suivi' button and opens tracking number input when clicked", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    
    // Vérifier que le bouton est rendu
    expect(
      screen.getByText("Ajouter un numéro de suivi pour un retour")
    ).toBeInTheDocument();
  
    // Simuler le clic sur le bouton
    fireEvent.click(
      screen.getByText("Ajouter un numéro de suivi pour un retour")
    );
  
    // Vérifier que le composant TrackingNumberCreate est rendu
    expect(screen.getByTestId("ClientTrackingNumberCreate")).toBeInTheDocument();
  });
  test("renders tracking numbers when they exist", () => {
    render(<List orderHistory={mockOrderHistory} filter={() => true} />);
    expect(screen.getByText(/№ suivi de retour client : JNFDNDM987MND*/i)).toBeInTheDocument();
    expect(screen.getByText(/№ suivi de retour client : JND&HDYS#@FJKS/i)).toBeInTheDocument(); 
    expect(screen.getByText(/№ suivi de commande : 102938MAUCBQPD/i)).toBeInTheDocument();
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
