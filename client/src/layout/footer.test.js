import React from "react";
import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { render } from "../test/utils";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  it("renders correctly", () => {
    render(<Footer />);

    // Vérifie que le composant est rendu sans erreur
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    // Vérifie que les liens vers les catégories sont présents
    expect(screen.getByText("Accessoires cheveux")).toBeInTheDocument();
    expect(screen.getByText("Bijoux")).toBeInTheDocument();
    expect(screen.getByText("Demoiselles d'honneur")).toBeInTheDocument();
    expect(screen.getByText("Bracelets")).toBeInTheDocument();

    // Vérifie que les liens du menu principal sont présents
    expect(screen.getByText("Pour un jour unique")).toBeInTheDocument();
    expect(screen.getByText("Pour le quotidien")).toBeInTheDocument();
    expect(screen.getByText("A propos")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    // Vérifie que les liens d'informations sont présents
    expect(screen.getByText("Livraisons et Retours")).toBeInTheDocument();
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
    expect(
      screen.getByText("Conditions générales de vente")
    ).toBeInTheDocument();

    // Vérifie que les icônes de réseaux sociaux sont présentes
    expect(screen.getByAltText("facebook")).toBeInTheDocument();
    expect(screen.getByAltText("instagram")).toBeInTheDocument();

    // Vérifie que les informations de bas de page sont présentes
    expect(screen.getByText("© SUPER CINDY")).toBeInTheDocument();
    expect(screen.getByAltText("payment")).toBeInTheDocument();
  });
});
