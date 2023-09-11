describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit(
      '/send?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6',
    )
    cy.url().should(
      'contain',
      '/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6',
    )
  })
})
