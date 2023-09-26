import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    1: '0x7C9FA4433E491cEb656E8Ad4ffA5E1D601860E0C',
    8453: '0xC419328A3A5b7b4E2312946F90cd034Cf7abf0Cc',
  }

  it(`get address for mainnet (chainId 1)`, () => {
    const expected = address[1]
    expect(getAddress(address, 1)).toEqual(expected)
  })
  it(`get address for testnet (chainId 8453)`, () => {
    const expected = address[8453]
    expect(getAddress(address, 8453)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    const expected = address[1]
    expect(getAddress(address, 1)).toEqual(expected)
  })
})
