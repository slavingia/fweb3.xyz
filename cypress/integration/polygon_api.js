describe('Polygon endpoint tests', () => {
  it('should fail without a wallet', () => {
    cy.request({url:'/api/polygon', failOnStatusCode: false}).then((response) => {
      expect(response.status).to.equal(500)
    })
  })

  it('should return data with a wallet', () => {
    cy.request('/api/polygon/?wallet_address=test').then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
