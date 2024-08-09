import React from "react";
import { Particle } from "./Particle";

interface EffectType {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  size: string;
  duration: number;
}

export const BackgroundEffects: React.FC<{ effects: EffectType[] }> = React.memo(({ effects }) => {
  return (
    <>
      {effects.map((effect, index) => (
        <Particle effect={effect} key={index} />
      ))}
    </>
  );
});
