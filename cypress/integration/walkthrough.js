// walkthrough.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Walkthrough Tests", () => {
  it("should load data for each dot", () => {
    cy.visit("/");

    cy.get(".js-dot0").click();
    cy.get(".js-dot1").click();
    cy.get(".js-dot2").click();
    cy.get(".js-dot3").click();
    cy.get(".js-dot4").click();
    cy.get(".js-dot5").click();
    cy.get(".js-dot6").click();
    cy.get(".js-dot7").click();
    cy.get(".js-dot8").click();
  });
});
