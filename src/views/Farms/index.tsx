import React, { FC } from 'react'
import Farms, { FarmsContext } from './Farms'

export const FarmsPageLayout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <Farms>{children}</Farms>
}

export const PoolsPageLayout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <Farms>{children}</Farms>
}

export { FarmsContext }
