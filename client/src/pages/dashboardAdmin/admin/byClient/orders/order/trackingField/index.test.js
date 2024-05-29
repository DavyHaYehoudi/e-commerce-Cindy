import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Listing from "./";
import { render } from "../../../../../../test/utils";

describe("Listing Component", () => {
  const trackingNumberList = [
    { _id: 1, isAdmin: true },
    { _id: 2, isAdmin: false },
    // Add more tracking number items as needed
  ];

  const client = {
    id: "clientId",
  };

  const orderId = "orderId";

  test("renders the component with add tracking number button", () => {
    render(
      <Listing
        trackingNumberList={trackingNumberList}
        client={client}
        orderId={orderId}
      />
    );

    expect(screen.getByText("Ajouter un numéro de suivi")).toBeInTheDocument();
  });

  test("opens and closes the tracking number creation form on button click", () => {
    render(
      <Listing
        trackingNumberList={trackingNumberList}
        client={client}
        orderId={orderId}
      />
    );
    screen.getByText("Ajouter un numéro de suivi");
  });
});
