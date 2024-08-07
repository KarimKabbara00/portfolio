import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { nonLinearNegativeParabolicTrend } from "../../helperFunctions";

interface effectObject {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  color: string;
  size: string;
}

interface propType {
  effect: effectObject;
}

export const Particle: React.FC<propType> = ({ effect }) => {
  const [opacity, setOpacity] = useState<number>(0);

  const particleAnimation = useSpring({
    from: { left: effect.fromX, top: effect.fromY },
    to: { left: effect.toX, top: effect.toY },
    config: { ...config.molasses, duration: 60000 },
    onChange: ({ value }) => {
      const perecentXTraveled = (value.left - effect.fromX) / (effect.toX - effect.fromX);
      const perecentYTraveled = (value.top - effect.fromY) / (effect.toY - effect.fromY);
      const progress = Math.max(perecentXTraveled, perecentYTraveled); // bigger of the two, to change opacity based on when the particle stops moving
      if (progress <= 0.05) setOpacity(0.1);
      if (progress <= 0.1) setOpacity(0.2);
      else if (progress <= 0.15) setOpacity(0.3);
      else if (progress <= 0.25) setOpacity(0.5);
      else if (progress <= 0.4) setOpacity(0.8);
      else if (progress <= 0.6) setOpacity(1);
      else if (progress <= 0.7) setOpacity(0.6);
      else if (progress <= 0.8) setOpacity(0.5);
      else if (progress <= 1) setOpacity(1 - progress);
    },
  });

  const particleStyle = {
    backgroundColor: effect.color,
    opacity: opacity,
    height: effect.size,
    width: effect.size,
  };

  return <animated.div style={{ ...particleAnimation, ...particleStyle }} className="-z-1 fixed rounded-full bg-red-500"></animated.div>;
};
