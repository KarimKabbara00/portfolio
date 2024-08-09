import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface effectObject {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  color: string;
  size: string;
  duration: number;
}

interface propType {
  effect: effectObject;
}

export const Particle: React.FC<propType> = React.memo(({ effect }) => {
  const [opacity, setOpacity] = useState<number>(0);

  const particleAnimation = useSpring({
    from: { left: effect.fromX, top: effect.fromY },
    to: { left: effect.toX, top: effect.toY },
    config: { ...config.molasses, duration: effect.duration },
    onChange: ({ value }) => {
      const perecentXTraveled = (value.left - effect.fromX) / (effect.toX - effect.fromX);
      const perecentYTraveled = (value.top - effect.fromY) / (effect.toY - effect.fromY);
      const progress = Math.max(perecentXTraveled, perecentYTraveled); // bigger of the two to change opacity based on when the particle nears it destination on either axis
      if (progress < 0.4) setOpacity(progress * 2);
      else if (progress < 0.6) setOpacity(1);
      else setOpacity(1 - progress);
    },
  });

  const particleStyle = {
    backgroundColor: effect.color,
    opacity: opacity,
    height: effect.size,
    width: effect.size,
  };

  return <animated.div style={{ ...particleAnimation, ...particleStyle }} className="-z-1 fixed rounded-full bg-red-500"></animated.div>;
});
