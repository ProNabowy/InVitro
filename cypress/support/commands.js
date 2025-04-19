// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  // Add login logic here if needed
});

// -- This is a child command --
Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});
