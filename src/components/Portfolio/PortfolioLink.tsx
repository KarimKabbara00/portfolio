import { useSpring, animated, config } from "@react-spring/web";
import React, { useState } from "react";

interface propTypes {
  image: string;
  link: string;
  type: string;
}

export const PortfolioLink: React.FC<propTypes> = ({ image, link, type }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const animate = useSpring({
    transform: hovered ? "translate(-4%, -8%)" : "translate(0%, 0%)",
    boxShadow: hovered ? "8px 10px 15px rgba(0, 0, 0, 0.2)" : "0px 0px 0px rgba(0, 0, 0, 0)",
    config: config.default,
  });

  return (
    <div className="relative" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
      <div className="absolute z-10 h-full w-full border-2 border-primary bg-primary px-5 py-2"></div>
      <animated.a
        style={animate}
        href={link}
        target="_blank"
        rel="noreferrer"
        className="relative z-20 flex items-center justify-center border-2 border-primary bg-bgColor px-5 py-2 text-xl opacity-100">
        <div className="flex items-center gap-x-5">
          <img src={image} width="35px" />
          <span>{type}</span>
        </div>
      </animated.a>
    </div>
  );
};
