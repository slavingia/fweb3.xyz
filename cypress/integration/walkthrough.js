// walkthrough.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Walkthrough Tests", () => {
  it("should load data for each dot", () => {
    cy.visit("/");

    cy.get("h2").should("contain.text", "Learn and build in web3.");

    cy.get(".game-tile").eq(0).click();
    cy.get("h2").should("contain.text", "Learn and build in web3.");

    cy.get(".game-tile").eq(1).click();
    cy.get("h2").should("contain.text", "Receive tokens");

    cy.get(".game-tile").eq(2).click();
    cy.get("h2").should("contain.text", "Receive gas");

    cy.get(".game-tile").eq(3).click();
    cy.get("h2").should("contain.text", "Use gas to send tokens");

    cy.get(".game-tile").eq(4).click();
    cy.get("h2").should("contain.text", "Mint an NFT");

    cy.get(".game-tile").eq(5).click();
    cy.get("h2").should("contain.text", "Burn a token");

    cy.get(".game-tile").eq(6).click();
    cy.get("h2").should("contain.text", "Swap a token");

    cy.get(".game-tile").eq(7).click();
    cy.get("h2").should("contain.text", "Vote in a proposal");

    cy.get(".game-tile").eq(8).click();
    cy.get("h2").should("contain.text", "Create your own token");
  });
});
