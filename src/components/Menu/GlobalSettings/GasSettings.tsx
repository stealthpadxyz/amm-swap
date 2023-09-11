import { Flex, Button, Text } from '@pancakeswap/uikit'
import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import { useGasPriceManager } from 'state/user/hooks'
import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()
  const { chainId } = useActiveWeb3React()

  return (
    <Flex flexDirection="column">
      <Flex mb="12px" alignItems="center">
        <Text>{t('Default Transaction Speed (GWEI)')}</Text>
        <QuestionHelper
          text={t(
            'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees',
          )}
          placement="top-start"
          ml="4px"
        />
      </Flex>
      <Flex flexWrap="wrap">
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(chainId === ChainId.BSC ? GAS_PRICE_GWEI.default : GAS_PRICE_GWEI.defaultBase)
          }}
          variant={
            gasPrice === (ChainId.BSC ? GAS_PRICE_GWEI.default : GAS_PRICE_GWEI.defaultBase) ? 'primary' : 'tertiary'
          }
        >
          {t('Standard (%gasPrice%)', {
            gasPrice: chainId === ChainId.BSC ? GAS_PRICE.default : GAS_PRICE.defaultBase,
          })}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(chainId === ChainId.BSC ? GAS_PRICE_GWEI.fast : GAS_PRICE_GWEI.fastBase)
          }}
          variant={
            gasPrice === (chainId === ChainId.BSC ? GAS_PRICE_GWEI.fast : GAS_PRICE_GWEI.fastBase)
              ? 'primary'
              : 'tertiary'
          }
        >
          {t('Fast (%gasPrice%)', {
            gasPrice: chainId === ChainId.BSC ? GAS_PRICE.fast : GAS_PRICE.fastBase,
          })}
        </Button>
        <Button
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(chainId === ChainId.BSC ? GAS_PRICE_GWEI.instant : GAS_PRICE_GWEI.instantBase)
          }}
          variant={
            gasPrice === (chainId === ChainId.BSC ? GAS_PRICE_GWEI.instant : GAS_PRICE_GWEI.instantBase)
              ? 'primary'
              : 'tertiary'
          }
        >
          {t('Instant (%gasPrice%)', {
            gasPrice: chainId === ChainId.BSC ? GAS_PRICE.instant : GAS_PRICE.instantBase,
          })}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GasSettings
