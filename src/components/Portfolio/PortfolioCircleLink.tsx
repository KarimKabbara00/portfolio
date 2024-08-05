import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";

interface propTypes {
  image: string;
  link: string;
}

export const PortfolioCircleLink: React.FC<propTypes> = ({ image, link }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const animate = useSpring({
    from: { transform: hovered ? "scale(1)" : "scale(1.25)" },
    to: { transform: hovered ? "scale(1.25)" : "scale(1)" },
  });

  return (
    <animated.a
      style={animate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="relative flex items-center justify-center rounded-full bg-secondary opacity-100 p-1">
      <img src={image} width="35px" />
    </animated.a>
  );
};
