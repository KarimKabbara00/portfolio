import React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  icon: IconDefinition;
  inView: boolean;
  destination: string;
}

export const NavItem: React.FC<propTypes> = ({ icon, inView, destination }) => {
  const colorAnimation = useSpring({
    color: inView ? "#ef233c" : "white",
    config: config.gentle,
  });

  function goTo(destination: string) {
    document.getElementById(destination)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `/#${destination}`);
  }

  return (
    <animated.div id="navButtonIcon" style={colorAnimation} className="cursor-pointer" onClick={() => goTo(destination)}>
      <FontAwesomeIcon icon={icon} className="text-xl hover:text-neutral-400" />
    </animated.div>
  );
};
