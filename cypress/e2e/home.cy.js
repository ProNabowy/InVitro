/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page", () => {
    cy.get("main").should("exist");
  });

  it("should show loading state when navigating", () => {
    cy.visit("/appointments");
    cy.get('[data-test="loading-spinner"]').should("exist");
  });

  it("should navigate to appointments page", () => {
    cy.visit("/appointments");
    cy.url().should("include", "/appointments");
  });

  it("should handle both empty and populated doctors lists", () => {
    // First check if the "No Doctors Yet" message exists
    cy.get("body").then(($body) => {
      const noDoctorsMessage = $body.find("h2:contains('No Doctors Yet')");

      if (noDoctorsMessage.length > 0) {
        // If the "No Doctors" message exists, verify it
        cy.contains("No Doctors Yet").should("exist");
      } else {
        // If the "No Doctors" message doesn't exist, check for doctor cards
        // Look for any doctor card elements
        cy.get("img[alt^='Doctor']").should("exist");
      }
    });
  });
});
