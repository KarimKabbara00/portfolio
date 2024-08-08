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
      <div className="absolute rounded-sm z-10 h-full w-full border-2 border-primary bg-primary"></div>
      <animated.a
        tabIndex={-1}
        style={animate}
        href={link}
        target="_blank"
        rel="noreferrer"
        className="relative rounded-sm z-20 flex items-center justify-center border-2 border-primary bg-bgColor xl:px-4 xl:py-2 xl:text-lg 2xl:px-5 2xl:py-2 2xl:text-xl">
        <div className="flex items-center xl:gap-x-3 2xl:gap-x-5">
          <img className="xl:w-8 2xl:w-9" src={image} alt={type} />
          <span>{type}</span>
        </div>
      </animated.a>
    </div>
  );
};
