import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { faCopyright as farCopyright } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FooterLink } from "./FooterLink";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  function goToTop() {
    document?.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }

  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const hoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#ef233c" : "transparent",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  return (
    <footer className="absolute bottom-0 flex h-20 w-full items-center justify-between bg-neutral-800">
      <div className="ml-6 flex items-center gap-x-2">
        <FontAwesomeIcon className="text-xl text-primary" icon={farCopyright} />
        <span className="h-fit w-fit text-lg">{new Date().getFullYear()} Karim Kabbara</span>
      </div>
      <div className="absolute left-1/2 ml-auto mr-auto flex -translate-x-1/2 transform gap-x-6">
        <FooterLink icon={faGithub} link="https://github.com/KarimKabbara00/" />
        <FooterLink icon={faLinkedin} link="https://linkedin.com/in/karim-kabbara" />
        <FooterLink icon={faEnvelope} link="mailto:karim.kabbara00@gmail.com" />
      </div>
      <animated.button
        tabIndex={-1}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        type="button"
        onClick={goToTop}
        style={hoverAnim}
        className="mr-6 flex h-10 w-10 items-center justify-center rounded-sm border-2 border-primary text-primary xl:text-lg 2xl:text-xl">
        <FontAwesomeIcon className="text-base" icon={faArrowUp} />
      </animated.button>
    </footer>
  );
};
