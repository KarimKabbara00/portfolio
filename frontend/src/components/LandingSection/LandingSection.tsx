import React, { useState, useEffect, useRef } from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from "@react-spring/web";
import { TextAutoType } from "./TextAutoType";
import { Info } from "./Info";

interface propTypes {
  landingInView: boolean;
  setLandingInView: (inView: boolean) => void;
}

export const LandingSection: React.FC<propTypes> = ({ landingInView, setLandingInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // hide nav bar
  useEffect(() => {
    const checkInView = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        // const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const inView = rect.top >= -890 && rect.left >= 0 && rect.bottom >= 50 && rect.right <= windowWidth;
        setLandingInView(inView);
      }
    };
    document.addEventListener("scroll", checkInView);
    checkInView(); // check on start up in case we land on portfolio directly
    return () => document.removeEventListener("scroll", checkInView);
  }, [setLandingInView]);

  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const hoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#ef233c" : "#141516",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  function goToAbout() {
    document?.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "/#about");
  }

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50);
  }, []);

  const fadeIn = useSpring({
    opacity: loaded ? 1 : 0,
  });

  return (
    <animated.div
      style={fadeIn}
      ref={targetRef}
      id="home"
      className="z-1 smallScreen:gap-y-3 xlScreen:gap-y-5 relative flex h-dvh w-dvw flex-col items-center justify-center border-red-600 text-white">
      <Info />
      <div className="xlScreen:text-5xl xsScreen:w-11/12 xxsScreen:text-xl largeScreen:text-4xl smallScreen:text-3xl xsScreen:text-2xl ml-auto mr-auto flex w-1/2 flex-col items-center justify-center">
        <div className="xlScreen:mb-3 smallScreen:mb-1">
          Hello, I am <span className="text-primary">Karim</span>.
        </div>
        <TextAutoType />
      </div>
      <animated.button
        tabIndex={-1}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        type="button"
        onClick={goToAbout}
        style={hoverAnim}
        className="smallScreen:text-base xsScreen:text-sm xlScreen:px-6 xlScreen:py-3 largeScreen:text-lg largeScreen:px-4 largeScreen:py-2 xlScreen:text-xl flex items-center justify-center gap-x-2 rounded-sm border-2 border-primary text-primary">
        <div>Learn more</div>
        <FontAwesomeIcon className="text-base" icon={faArrowDown} />
      </animated.button>
    </animated.div>
  );
};
