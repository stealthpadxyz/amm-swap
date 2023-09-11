import { Svg, SvgProps } from '@pancakeswap/uikit'

const GradientLogo: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <image href='/images/logo-round.png' width={48}/>
    </Svg>
  )
}

export default GradientLogo
