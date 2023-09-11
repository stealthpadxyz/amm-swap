/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 300 90" {...props}>
      {isDark ? (
        <image width={300} href="/images/logoWithText-dark.png" />
      ) : (
        <image href="/images/logoWithText.png" width={300} />
      )}
    </Svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
