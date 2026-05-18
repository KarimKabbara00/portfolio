import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated, config } from "@react-spring/web";
import React, { useState } from "react";

interface propTypes {
  icon: IconDefinition;
  link: string;
  hoverColor: string;
}

export const FooterLink: React.FC<propTypes> = ({ icon, link, hoverColor }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const hoverAnimation = useSpring({
    color: hovered ? hoverColor : "#E7ECEF",
    transform: hovered ? "translateY(-2px)" : "translateY(0px)",
    config: config.stiff,
  });

  return (
    <div>
      <animated.a style={hoverAnimation} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="cursor-pointer" href={link} target="_blank" rel="noreferrer">
        <FontAwesomeIcon className="text-[2.1rem] contactFieldWidth:text-[1.7rem] xsScreen:text-[1.9rem]" icon={icon} />
      </animated.a>
    </div>
  );
};
