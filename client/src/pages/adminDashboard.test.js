import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminDashboard from "./AdminDashboard";
import { render } from "../test/utils";

// Mock des composants qui utilisent useFetchSlice
jest.mock("../selectors/useFetchSlice", () => jest.fn());

describe("AdminDashboard Component", () => {
  test("renders AdminDashboard component correctly", () => {
    render(<AdminDashboard />);
    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
  });

  test("handles client list correctly", () => {
    render(<AdminDashboard />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Liste des clients" })
    ).toBeInTheDocument();
  });
});
