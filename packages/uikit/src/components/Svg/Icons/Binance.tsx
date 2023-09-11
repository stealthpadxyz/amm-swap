import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <image href="/images/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.png" width={32}/>
    </Svg>
  );
};

export default Icon;
