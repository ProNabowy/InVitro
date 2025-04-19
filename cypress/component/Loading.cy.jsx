import React from "react";
import Loading from "../../src/components/Loading";

describe("Loading.cy.jsx", () => {
  it("renders the loading spinner", () => {
    cy.mount(<Loading />);

    // Check if the loading spinner exists
    cy.get('[data-test="loading-spinner"]').should("exist");

    // Check if the loading spinner has the correct ARIA attributes
    cy.get('[data-test="loading-spinner"]').should(
      "have.attr",
      "role",
      "status"
    );
    cy.get('[data-test="loading-spinner"]').should(
      "have.attr",
      "aria-live",
      "polite"
    );
    cy.get('[data-test="loading-spinner"]').should(
      "have.attr",
      "aria-label",
      "Loading content"
    );

    // Check if the loading text is present for screen readers
    cy.get(".sr-only").should("contain", "Loading...");
  });
});
