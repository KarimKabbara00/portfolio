import React, { useRef } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface ParticleProps extends MeshProps {
  position: [number, number, number];
  color: string;
  velocity: [number, number];
  boundary: { width: number; height: number };
}

export const Particle: React.FC<ParticleProps> = ({ position, color, velocity, boundary }) => {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += velocity[0];
      ref.current.position.y += velocity[1];
      if (ref.current.position.x > boundary.width) ref.current.position.x = -boundary.width;
      if (ref.current.position.x < -boundary.width) ref.current.position.x = boundary.width;
      if (ref.current.position.y > boundary.height) ref.current.position.y = -boundary.height;
      if (ref.current.position.y < -boundary.height) ref.current.position.y = boundary.height;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.009, 32]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
