import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Particle } from "./Particle";

interface ParticleData {
  position: [number, number, number];
  color: string;
  velocity: [number, number];
}

export const ParticleEffect: React.FC = () => {
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [boundaries, setBoundaries] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const colors = ["#ef233c", "#CE6E00"];

    // Calculate boundaries based on the screen size
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraHeight = 10;
    const cameraWidth = cameraHeight * aspectRatio;

    setBoundaries({
      width: cameraWidth / 2,
      height: cameraHeight / 2,
    });

    const newParticles: ParticleData[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        position: [
          Math.random() * cameraWidth - cameraWidth / 2,
          Math.random() * cameraHeight - cameraHeight / 2,
          0, // 2D
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: [Math.random() * 0.005 - 0.0025, Math.random() * 0.005 - 0.0025],
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <Canvas>
      {particles.map((particle, index) => (
        <Particle key={index} position={particle.position} color={particle.color} velocity={particle.velocity} boundary={boundaries} />
      ))}
    </Canvas>
  );
};
