// check_dots.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Dots Tests", () => {
  it("load the default page", () => {
    cy.visit("/");
    cy.get(".game-tile").should("be.visible");
    cy.get(".game-tile").should("have.length", 9);
    cy.get(".game-tile.completed").should("have.length", 0);
  });

  xit("loads a wallet that is complete", () => {
    cy.visit("/?wallet=0x2A9d8CfD86796E6A68AF9c83FD90F67CcaF1352c");
    cy.get(".game-tile.completed").should("have.length", 9);
  });

  it("load a wallet that has not completed anything", () => {
    cy.visit("/");
    cy.get(".game-tile").should("be.visible");
    cy.get(".game-tile").should("have.length", 9);
    cy.get(".game-tile.completed").should("have.length", 0);
  });
});
