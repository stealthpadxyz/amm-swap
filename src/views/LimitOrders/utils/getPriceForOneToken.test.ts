import { JSBI, Token, TokenAmount } from '@pancakeswap/sdk'
import getPriceForOneToken from './getPriceForOneToken'

const STEALTH = new Token(56, '0xB18F98822C22492Bd6b77D19cae9367f3D60fcBf', 18, 'STEALTH', 'StealthPad Token')
const BUSD = new Token(56, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD')
const DOGE = new Token(56, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 8, 'DOGE', 'Binance-Peg Dogecoin')

const EIGHT_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(8))
const EIGHTEEN_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
const ZERO = JSBI.multiply(JSBI.BigInt(0), EIGHTEEN_DECIMALS)
const ONE = JSBI.multiply(JSBI.BigInt(1), EIGHTEEN_DECIMALS)
const ONE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(1), EIGHT_DECIMALS)
const FIVE = JSBI.multiply(JSBI.BigInt(5), EIGHTEEN_DECIMALS)
const FIVE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(5), EIGHT_DECIMALS)

describe('limitOrders/utils/getPriceForOneToken', () => {
  describe.each([
    [new TokenAmount(STEALTH, ONE), new TokenAmount(BUSD, ONE), '1'],
    [new TokenAmount(STEALTH, FIVE), new TokenAmount(BUSD, FIVE), '1'],
    [new TokenAmount(STEALTH, ONE), new TokenAmount(BUSD, FIVE), '5'],
    [new TokenAmount(STEALTH, FIVE), new TokenAmount(BUSD, ONE), '0.2'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(BUSD, ONE), '1'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(BUSD, FIVE), '1'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(BUSD, FIVE), '5'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(BUSD, ONE), '0.2'],
    [new TokenAmount(STEALTH, ZERO), new TokenAmount(BUSD, ONE), undefined],
    [new TokenAmount(STEALTH, ONE), new TokenAmount(BUSD, ZERO), undefined],
  ])(`returns correct price`, (input, output, expected) => {
    it(`for ${input.toSignificant(6)} ${input.currency.symbol} -> ${output.toSignificant(6)} ${
      output.currency.symbol
    }`, () => {
      const price = getPriceForOneToken(input, output)
      expect(price?.toSignificant(6)).toBe(expected)
    })
  })
})
