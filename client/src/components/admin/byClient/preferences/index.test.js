import React from "react";
import { screen } from "@testing-library/react";
import {render} from "../../../../test/utils"
import Details from ".";
import "@testing-library/jest-dom";

describe("Details Component", () => {
  it("devrait afficher un message si la liste de favoris est vide", () => {
    render(<Details client={{ wishlist: [] }} />);

    const emptyWishlistMessage = screen.getByText(/La liste des favoris est vide/i);
    expect(emptyWishlistMessage).toBeInTheDocument();
  });

  it("devrait afficher un message si le panier est vide", () => {
    render(<Details client={{ cart: [] }} />);

    const emptyCartMessage = screen.getByText(/Le panier est vide/i); 
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it("devrait afficher les éléments de la liste de favoris", () => {
    const wishlistItems = [
      { productId: "1"},
      { productId: "2"},
    ];

    render(<Details client={{ wishlist: wishlistItems }} />);

    wishlistItems.forEach((item) => {
      const wishlistItem = screen.getByTestId(`wishlist-item-${item.productId}`);
      expect(wishlistItem).toBeInTheDocument();
    });

    const emptyWishlistMessage = screen.queryByText(/La liste des favoris est vide/i);
    expect(emptyWishlistMessage).not.toBeInTheDocument();
  });

  it("devrait afficher les éléments du panier", () => {
    const cartItems = [
      { productId: "1"},
      { productId: "2"},
    ]; 
  
    render(<Details client={{ cart: cartItems }} />);

    cartItems.forEach((item) => {
      const cartItem = screen.getByTestId(`cart-item-${item.productId}`); 
      expect(cartItem).toBeInTheDocument();
    });

    const emptyCartMessage = screen.queryByText(/Le panier est vide/i);
    expect(emptyCartMessage).not.toBeInTheDocument();
  });
});
 