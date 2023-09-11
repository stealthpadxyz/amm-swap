export const getLPSymbol = (token0Symbol: string, token1Symbol: string) => {
  if (token0Symbol === 'WETH') {
    return `ETH-${token1Symbol} LP`
  }
  if (token1Symbol === 'WETH') {
    return `${token0Symbol}-ETH LP`
  }
  return `${token0Symbol}-${token1Symbol} LP`
}
