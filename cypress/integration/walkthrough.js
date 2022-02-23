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

    cy.get(".js-dot0").click();
    cy.get("h2").should("contain.text", "Connect your wallet");

    cy.get(".js-dot1").click();
    cy.get("h2").should("contain.text", "Receive tokens");

    cy.get(".js-dot2").click();
    cy.get("h2").should("contain.text", "Receive gas");

    cy.get(".js-dot3").click();
    cy.get("h2").should("contain.text", "Use gas to send tokens");

    cy.get(".js-dot4").click();
    cy.get("h2").should("contain.text", "Mint an NFT");

    cy.get(".js-dot5").click();
    cy.get("h2").should("contain.text", "Burn a token");

    cy.get(".js-dot6").click();
    cy.get("h2").should("contain.text", "Swap a token");

    cy.get(".js-dot7").click();
    cy.get("h2").should("contain.text", "Vote in a proposal");

    cy.get(".js-dot8").click();
    cy.get("h2").should("contain.text", "Create your own token");
  });
});
