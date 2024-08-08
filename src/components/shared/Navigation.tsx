import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faEnvelope, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated, config } from "@react-spring/web";

interface propTypes {
  landingInView: boolean;
  aboutInView: boolean;
  portfolioInView: boolean;
  contactInView: boolean;
}

export const Navigation: React.FC<propTypes> = ({ landingInView, aboutInView, portfolioInView, contactInView }) => {
  function goTo(destination: string) {
    document.getElementById(destination)?.scrollIntoView({ behavior: "smooth" });
  }

  const showNav = useSpring({
    from: { transform: landingInView ? "translateX(0%)" : "translateX(-125%)" },
    to: { transform: landingInView ? "translateX(-125%)" : "translateX(0%)" },
    config: config.default,
  });

  const animConfig = config.gentle;

  const landingNav = useSpring({
    color: landingInView ? "#ef233c" : "white",
    config: animConfig,
  });

  const aboutNav = useSpring({
    color: aboutInView ? "#ef233c" : "white",
    config: animConfig,
  });

  const portfolioNav = useSpring({
    color: portfolioInView ? "#ef233c" : "white",
    config: animConfig,
  });

  const contactNav = useSpring({
    color: contactInView ? "#ef233c" : "white",
    config: animConfig,
  });

  return (
    <animated.div style={showNav} className="z-100 fixed bottom-6 ml-3 flex w-12 flex-col items-center gap-y-7 text-white">
      <animated.div style={landingNav} className="cursor-pointer" onClick={() => goTo("home")}>
        <FontAwesomeIcon icon={faHome} className="xl:text-xl 2xl:text-2xl" />
      </animated.div>
      <animated.div style={aboutNav} className="cursor-pointer" onClick={() => goTo("about")}>
        <FontAwesomeIcon icon={faUser} className="xl:text-xl 2xl:text-2xl" />
      </animated.div>
      <animated.div style={portfolioNav} className="cursor-pointer" onClick={() => goTo("portfolio")}>
        <FontAwesomeIcon icon={faBriefcase} className="xl:text-xl 2xl:text-2xl" />
      </animated.div>
      <animated.div style={contactNav} className="cursor-pointer" onClick={() => goTo("contact")}>
        <FontAwesomeIcon icon={faEnvelope} className="xl:text-xl 2xl:text-2xl" />
      </animated.div>
    </animated.div>
  );
};
