import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 30 30" {...props}>
      <image href="/images/logo-round.png" height={32} width={32} />
    </Svg>
  );
};

export default Icon;
