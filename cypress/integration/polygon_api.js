describe('Polygon endpoint tests', () => {
  it('should fail without a wallet', () => {
    cy.request({ url: '/api/polygon', failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.equal(500)
      },
    )
  })

  it('should return data with a wallet', () => {
    // Example: {"tokenBalance":"31331000000000000000000","hasUsedFaucet":true,"hasSentTokens":true,"hasMintedNFT":true,"hasBurnedTokens":true,"hasSwappedTokens":true,"hasVotedInPoll":true,"hasDeployedContract":true}
    const expected = {
      tokenBalance: '31331000000000000000000',
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
      hasBurnedTokens: true,
      hasSwappedTokens: true,
      hasVotedInPoll: true,
      hasDeployedContract: true,
    }
    cy.request(
      '/api/polygon/?wallet_address=0x2A9d8CfD86796E6A68AF9c83FD90F67CcaF1352c',
    ).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(expected)
    })
  })

  it('should handle an invalid wallet', () => {
    // Example: {"tokenBalance":"Error! Invalid address format","hasUsedFaucet":false,"hasSentTokens":false,"hasMintedNFT":false,"hasBurnedTokens":false,"hasSwappedTokens":false,"hasVotedInPoll":false,"hasDeployedContract":false}
    cy.request({
      url: '/api/polygon/?wallet_address=invalid',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400)
    })
  })
})
