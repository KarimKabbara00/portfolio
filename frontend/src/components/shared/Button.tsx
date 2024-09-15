import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  text?: string;
  icon?: IconDefinition;
  callback: (optional?: string) => void;
}

export const Button: React.FC<propTypes> = ({ icon, text, callback }) => {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const hoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#ef233c" : "transparent",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  return (
    <animated.button
      tabIndex={-1}
      onMouseOver={() => setButtonHovered(true)}
      onMouseOut={() => setButtonHovered(false)}
      type="button"
      onClick={() => callback()}
      style={hoverAnim}
      className="xl:h-12 xl:w-40 xl:text-lg 2xl:h-14 2xl:w-44 2xl:text-xl flex items-center justify-center rounded-sm border-2 border-primary text-primary">
      <div>{text}</div>
      {icon && <FontAwesomeIcon className="text-base" icon={icon} />}
    </animated.button>
  );
};
