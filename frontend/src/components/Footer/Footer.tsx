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
    transform: buttonHovered ? "translateY(-2px)" : "translateY(0px)",
    config: { tension: 600, friction: 30 },
  });

  return (
    <footer className="contactFieldWidth:h-24 absolute bottom-0 flex h-[4.25rem] w-full flex-col">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="flex flex-1 items-center justify-between bg-[#212121]">
        <div className="contactFieldWidth:pb-8 ml-8 flex items-center gap-x-1">
          <span className="contactFieldWidth:text-base xxsScreen:text-[1rem] h-fit w-fit text-lg"> Karim Kabbara</span>
          <FontAwesomeIcon className="xxsScreen:text-sm ml-1 text-base text-white" icon={farCopyright} />
          <span className="xxsScreen:text-[1rem] text-base">{new Date().getFullYear()}</span>
        </div>

        <div className="contactFieldWidth:left-0 contactFieldWidth:bottom-0 contactFieldWidth:ml-8 contactFieldWidth:mb-3 contactFieldWidth:translate-x-0 absolute left-1/2 flex -translate-x-1/2 transform gap-x-7">
          <FooterLink icon={faGithub} link="https://github.com/KarimKabbara00/" hoverColor="#9b59b6" />
          <FooterLink icon={faLinkedin} link="https://linkedin.com/in/karim-kabbara" hoverColor="#0A66C2" />
          <FooterLink icon={faEnvelope} link="mailto:karim.kabbara00@gmail.com" hoverColor="#ef233c" />
        </div>
        <animated.button
          tabIndex={-1}
          onMouseOver={() => setButtonHovered(true)}
          onMouseOut={() => setButtonHovered(false)}
          type="button"
          onClick={goToTop}
          style={hoverAnim}
          className="xsScreen:h-9 xsScreen:w-9 mr-8 flex h-10 w-10 items-center justify-center rounded-sm border-2 border-primary text-primary xl:text-lg 2xl:text-xl">
          <FontAwesomeIcon className="text-base" icon={faArrowUp} />
        </animated.button>
      </div>
    </footer>
  );
};
