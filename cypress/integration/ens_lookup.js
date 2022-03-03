describe("ENS Lookup Tests", () => {
  it("load the page for 0x0...dead address that doesn't have an ENS name", () => {
    cy.visit("/?wallet=0x000000000000000000000000000000000000dead");
    cy.get("nav > a > p")
      .invoke("text")
      .should("eq", "0x000000000000000000000000000000000000dead");
  });

  it("load the page for an address known to have an ENS name", () => {
    cy.visit("/?wallet=0x147a0B6E848109D438445bA750645bCc37CbA825");
    // give it 6 seconds before checking since lookups can take a few seconds sometimes
    cy.wait(6000);
    cy.get("nav > a > p").invoke("text").should("eq", "jovanjester.eth");
  });
});
