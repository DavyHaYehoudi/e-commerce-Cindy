import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from ".";
import { render } from "../../test/utils";

describe("About Component", () => {
  test("renders MON HISTOIRE section correctly", async () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /MON HISTOIRE/i })
    ).toBeInTheDocument();
  });

  test("renders MES INSPIRATIONS section correctly", async () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /MES INSPIRATIONS/i })
    ).toBeInTheDocument();
  });

  test("renders NORALYA section correctly", async () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /NORALYA/i })
    ).toBeInTheDocument();
  });

  test("renders MES ENGAGEMENTS section correctly", async () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /MES ENGAGEMENTS/i })
    ).toBeInTheDocument();
  });

  test("renders bottom section correctly", async () => {
    render(<About />);
    expect(screen.getByText(/Je souhaite du fond du cœur/i)).toBeInTheDocument();
  });

  test("renders image in NORALYA section", async () => {
    render(<About />);
    expect(screen.getByAltText("profil")).toBeInTheDocument(); 
  });
});
