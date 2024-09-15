import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated, config } from "@react-spring/web";
import React, { useState } from "react";

interface propTypes {
  icon: IconDefinition;
  link: string;
}

export const FooterLink: React.FC<propTypes> = ({ icon, link }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const hoverAnimation = useSpring({
    color: hovered ? "#ef233c" : "#E7ECEF",
    config: config.stiff,
  });

  return (
    <div>
      <animated.a style={hoverAnimation} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="cursor-pointer" href={link} target="_blank" rel="noreferrer">
        <FontAwesomeIcon className="text-[1.9rem] contactFieldWidth:text-[1.5rem] xsScreen:text-[1.75rem]" icon={icon} />
      </animated.a>
    </div>
  );
};
