/// <reference types="cypress" />

describe("Appointments Page", () => {
  beforeEach(() => {
    cy.visit("/appointments");
  });

  it("should load the appointments page", () => {
    cy.get("main").should("exist");
  });

  it("should handle both empty and populated appointments lists", () => {
    // Check if the appointments list container exists
    cy.get("body").then(($body) => {
      if ($body.find('[data-test="appointments-list"]').length > 0) {
        // If the container exists, verify it
        cy.get('[data-test="appointments-list"]').should("exist");
      } else {
        // If the container doesn't exist, check for the "No Appointments" message
        cy.contains("No Appointments Yet").should("exist");
      }
    });
  });

  it("should show loading state when data is loading", () => {
    cy.reload();
    cy.get('[data-test="loading-spinner"]').should("exist");
  });
});
