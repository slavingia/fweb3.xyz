// check_dots.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Dots Tests", () => {
    it("Loads the page", () => {
        cy.visit("/");
        cy.get(".game-tile").should("be.visible");
        cy.get(".game-tile").should("have.length", 9);
    }
    )
})
