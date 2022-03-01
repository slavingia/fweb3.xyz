// walkthrough.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const {
  checkColorBeforeClick,
  checkColorAfterClick,
} = require("../support/helper");

describe("Walkthrough Tests", () => {
  it("should load data for each dot", () => {
    cy.visit("/");

    cy.get("h2").should("contain.text", "Learn and build in web3.");

    checkColorBeforeClick(0);
    cy.get(".game-tile").eq(0).click();
    cy.get("h2").should("contain.text", "Learn and build in web3.");
    checkColorAfterClick(0);

    checkColorBeforeClick(1);
    cy.get(".game-tile").eq(1).click();
    cy.get("h2").should("contain.text", "Receive tokens");
    checkColorAfterClick(1);

    checkColorBeforeClick(2);
    cy.get(".game-tile").eq(2).click();
    cy.get("h2").should("contain.text", "Receive gas");
    checkColorAfterClick(2);

    checkColorBeforeClick(3);
    cy.get(".game-tile").eq(3).click();
    cy.get("h2").should("contain.text", "Use gas to send tokens");
    checkColorAfterClick(3);

    checkColorBeforeClick(4);
    cy.get(".game-tile").eq(4).click();
    cy.get("h2").should("contain.text", "Mint an NFT");
    checkColorAfterClick(4);

    checkColorBeforeClick(5);
    cy.get(".game-tile").eq(5).click();
    cy.get("h2").should("contain.text", "Burn a token");
    checkColorAfterClick(5);

    checkColorBeforeClick(6);
    cy.get(".game-tile").eq(6).click();
    cy.get("h2").should("contain.text", "Swap a token");
    checkColorAfterClick(6);

    checkColorBeforeClick(7);
    cy.get(".game-tile").eq(7).click();
    cy.get("h2").should("contain.text", "Vote in a proposal");
    checkColorAfterClick(7);

    checkColorBeforeClick(8);
    cy.get(".game-tile").eq(8).click();
    cy.get("h2").should("contain.text", "Create your own token");
    checkColorAfterClick(8);
  });
});
