describe.only("Polygon endpoint tests", () => {
  it("should fail without a wallet", () => {
    cy.request({ url: "/api/polygon", failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.equal(500);
      }
    );
  });

  it("should return data with a wallet", () => {
    cy.request(
      "/api/polygon/?wallet_address=0x2A9d8CfD86796E6A68AF9c83FD90F67CcaF1352c"
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.equal({}); // debug
    });
  });

  it("should handle an invalid wallet", () => {
    cy.request({
      url: "/api/polygon/?wallet_address=invalid",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(500);
    });
  });
});
