import React from "react";
import { faAt, faBriefcase, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";
import { NavItem } from "./NavItem";

interface propTypes {
  landingInView: boolean;
  aboutInView: boolean;
  portfolioInView: boolean;
  contactInView: boolean;
}

export const Navigation: React.FC<propTypes> = ({ landingInView, aboutInView, portfolioInView, contactInView }) => {
  const fadeIn = useSpring({
    opacity: landingInView ? 0 : 1,
    transform: landingInView ? "translateY(-100%)" : "translateY(0%)",
    config: { tension: 300, friction: 30 },
  });

  return (
    <animated.nav
      style={fadeIn}
      id="nav"
      className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-center border-b border-white/10 bg-bgColor/80 backdrop-blur-md">
      <div className="flex items-center gap-x-10 xsScreen:gap-x-6">
        <NavItem icon={faHome} inView={landingInView} destination="home" label="Home" />
        <NavItem icon={faUser} inView={aboutInView} destination="about" label="About" />
        <NavItem icon={faBriefcase} inView={portfolioInView} destination="portfolio" label="Portfolio" />
        <NavItem icon={faAt} inView={contactInView} destination="contact" label="Contact" />
      </div>
    </animated.nav>
  );
};
