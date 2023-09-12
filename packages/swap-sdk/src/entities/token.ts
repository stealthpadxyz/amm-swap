import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string
  public readonly projectLink?: string

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    projectLink?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
    this.projectLink = projectLink
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

// export const WETH9 = {
//   [ChainId.ETHEREUM]: new Token(
//     ChainId.ETHEREUM,
//     '0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     18,
//     'WETH',
//     'Wrapped Ether',
//     'https://weth.io'
//   ),
//   [ChainId.RINKEBY]: new Token(
//     ChainId.RINKEBY,
//     '0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     18,
//     'WETH',
//     'Wrapped Ether',
//     'https://weth.io'
//   )
// }

export const WETH = {
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped ETH',
    'https://stealthswap.trade'
  ),
  [ChainId.BASE]: new Token(
    ChainId.BASE,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped ETH',
    'https://stealthswap.trade'
  ),
  [ChainId.STEALTH_TESTNET]: new Token(
    ChainId.STEALTH_TESTNET,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped ETH',
    'https://stealthswap.trade'
  ),
}

export const WNATIVE = {
  // [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  // [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.BSC]: WETH[ChainId.BSC],
  [ChainId.BASE]: WETH[ChainId.BASE],
  [ChainId.STEALTH_TESTNET]: WETH[ChainId.STEALTH_TESTNET],
}
