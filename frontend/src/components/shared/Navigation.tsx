import React from "react";
import { faAt, faBriefcase, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated, config } from "@react-spring/web";
import chevronLeft from "../../assets/icons/other/chevronLeft.svg";
import chevronRight from "../../assets/icons/other/chevronRight.svg";
import { NavItem } from "./NavItem";

interface propTypes {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  landingInView: boolean;
  aboutInView: boolean;
  portfolioInView: boolean;
  contactInView: boolean;
}

export const Navigation: React.FC<propTypes> = ({ showNav, setShowNav, landingInView, aboutInView, portfolioInView, contactInView }) => {

  const showNavAnim = useSpring({
    transform: showNav ? "translate(125%, 0%)" : "translate(0%, 0%)",
    config: config.default,
  });

  return (
    <animated.nav style={showNavAnim} id="test" className="fixed top-1/2 z-50 h-12 w-12 text-white">
      <div className="absolute left-0 -translate-x-1/2 transform">
        <div
          id="nav"
          className="absolute -left-12 bottom-1/2 z-10 flex h-56 w-16 translate-y-1/2 transform flex-col items-center justify-center gap-y-7 rounded-lg border-2 border-zinc-700 bg-neutral-900 shadow-inner">
          <NavItem icon={faHome} inView={landingInView} destination="home" />
          <NavItem icon={faUser} inView={aboutInView} destination="about" />
          <NavItem icon={faBriefcase} inView={portfolioInView} destination="portfolio" />
          <NavItem icon={faAt} inView={contactInView} destination="contact" />
        </div>
        <button
          id="navButton"
          type="button"
          onClick={() => setShowNav((prev: boolean) => !prev)}
          className="z-1 relative flex h-10 w-10 items-center justify-end rounded-xl border-2 border-zinc-700 bg-neutral-900 shadow-inner">
          <img id="navButton" style={{ marginRight: showNav ? "0.15rem" : "0rem" }} className="w-[1.2rem]" alt="navBarArrow" src={showNav ? chevronLeft : chevronRight} />
        </button>
      </div>
    </animated.nav>
  );
};
