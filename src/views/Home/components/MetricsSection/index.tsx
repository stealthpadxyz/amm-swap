/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Heading,
  Flex,
  Text,
  Skeleton,
  ChartIcon,
  CommunityIcon,
  SwapIcon,
  FarmIcon,
  useMatchBreakpointsContext,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import useGetTopFarmsByApr from 'views/Home/hooks/useGetTopFarmsByApr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { totalLP, fetchStatus, fetched, topFarms } = useGetTopFarmsByApr(isIntersecting)

  const tvl = 0
  const txCount = fetched ? topFarms[0].apr : 0
  const addressCount = 11
  const { isMobile, isTablet } = useMatchBreakpointsContext()
  const isSmallerScreen = isMobile || isTablet
  const trades = formatLocalisedCompactNumber(txCount)
  const lpSymbol = fetched ? topFarms[0].lpSymbol : '-'
  const users = formatLocalisedCompactNumber(addressCount)
  const tvlString = fetchStatus ? formatLocalisedCompactNumber(parseInt(totalLP)) : '-'

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="72px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <FarmIcon color="primary" width="72px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="72px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" ref={observerRef}>
      <GradientLogo height="48px" width="48px" mb="24px" />
      <Heading textAlign="center" scale="xl">
        {t('Used by millions.')}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px">
        {t('Trusted with billions.')}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {t('StealthSwap has the most users of any decentralized platform, ever.')}
      </Text>
      {/* <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {entrusting}
          <>{tvl ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text>
      </Flex> */}

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join them?')}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        {/* <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%users% users', { users })}
            bodyText={t('Punkswap Holders')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard> */}
        {/* <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <Flex
            minHeight={[null, null, null, '168px']}
            minWidth="332px"
            width="fit-content"
            flexDirection="column"
            justifyContent="flex-end"
            mt={[null, null, null, '64px']}
          >
            {isSmallerScreen && trades.length > 13 ? (
              <Heading scale="lg">{trades}%</Heading>
            ) : (
              <Heading scale="xl">{trades}%</Heading>
            )}
            <Heading color={theme.colors.secondary} scale="xl" mb="24px">
              {lpSymbol}
            </Heading>
            <Text color="textSubtle">APR in Farms and Pools</Text>
          </Flex>
        </IconCard> */}
        <IconCard {...UsersCardData}>
          <StatCardContent
            headingText={t('Safe and secure')}
            bodyText={t('Trusted and secure platform')}
            highlightColor={theme.colors.bronze}
          />
        </IconCard>
        <IconCard {...TradesCardData}>
          <StatCardContent
            headingText={t('Rapid swaps')}
            bodyText={t('On the Ethereum and Base Network')}
            highlightColor={theme.colors.bronze}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('Stake and farm')}
            bodyText={t('Grow your portfolio on Ethereum and Base')}
            highlightColor={theme.colors.bronze}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
