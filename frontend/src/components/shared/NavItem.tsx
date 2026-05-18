import React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  icon: IconDefinition;
  inView: boolean;
  destination: string;
  label: string;
}

export const NavItem: React.FC<propTypes> = ({ icon, inView, destination, label }) => {
  const colorAnimation = useSpring({
    color: inView ? "#ef233c" : "#E7ECEF",
    config: config.gentle,
  });

  function goTo(destination: string) {
    document.getElementById(destination)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `/#${destination}`);
  }

  return (
    <animated.button
      id="navButtonIcon"
      type="button"
      style={colorAnimation}
      className="flex cursor-pointer items-center gap-x-2 transition-opacity hover:opacity-70"
      onClick={() => goTo(destination)}>
      <FontAwesomeIcon icon={icon} className="text-sm" />
      <span className="font-display text-sm font-medium xsScreen:hidden">{label}</span>
    </animated.button>
  );
};
