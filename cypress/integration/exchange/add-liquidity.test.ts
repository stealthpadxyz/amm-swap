describe('Add Liquidity', () => {
  it('loads the two correct tokens', () => {
    cy.visit('/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'STEALTH')
    cy.get('#add-liquidity-select-tokenb #pair').should('contain.text', 'BUSD')
    cy.getBySel('choose-pair-next').click({ force: true })
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'STEALTH')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'BUSD')
  })

  it('loads the ETH and tokens', () => {
    cy.visit('/add/ETH/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'ETH')
    cy.get('#add-liquidity-select-tokenb #pair').should('contain.text', 'STEALTH')
    cy.getBySel('choose-pair-next').click({ force: true })
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'ETH')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'STEALTH')
  })

  it('loads the WETH and tokens', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'WETH')
    cy.get('#add-liquidity-select-tokenb #pair').should('contain.text', 'STEALTH')
    cy.getBySel('choose-pair-next').click({ force: true })
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'WETH')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'STEALTH')
  })

  it('does not crash if ETH is duplicated', () => {
    cy.visit('/add/ETH/ETH')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'ETH')
    cy.get('#add-liquidity-select-tokenb #pair').should('not.contain.text', 'ETH')
  })

  it('does not crash if address is duplicated', () => {
    cy.visit('/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'STEALTH')
    cy.get('#add-liquidity-select-tokenb #pair').should('not.contain.text', 'STEALTH')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'QUACK')
    cy.get('#add-liquidity-select-tokenb #pair').should('contain.text', 'STEALTH')
    cy.getBySel('choose-pair-next').click({ force: true })
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'QUACK')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'STEALTH')
  })

  it('single token can be selected', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'QUACK')
    cy.visit('/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'BUSD')
    cy.visit('/add/ETH')
    cy.get('#add-liquidity-select-tokena #pair').should('contain.text', 'ETH')
  })

  it('redirects /add/token-token to add/token/token', () => {
    cy.visit('/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6-0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.url().should(
      'contain',
      '/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    )
  })

  it('redirects /add/ETH-token to /add/ETH/token', () => {
    cy.visit('/add/ETH-0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.url().should('contain', '/add/ETH/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
  })

  it('redirects /add/token-ETH to /add/token/ETH', () => {
    cy.visit('/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6-ETH')
    cy.url().should('contain', '/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6/ETH')
  })

  it('redirects /add/WETH to /add/WETH/token', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c-0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6')
    cy.url().should(
      'contain',
      '/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6',
    )
  })

  it('redirects /add/token-WETH to /add/token/WETH', () => {
    cy.visit('/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6-0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
    cy.url().should(
      'contain',
      '/add/0xbcBbaBd601B600E06a9f78008741Bf0Df10acfD6/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    )
  })
})
