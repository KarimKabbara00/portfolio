import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from "@react-spring/web";
import React, { useState, useEffect, useRef } from "react";

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
        const inView = rect.top >= -550 && rect.left >= 0 && rect.bottom >= 50 && rect.right <= windowWidth;
        setLandingInView(inView);
      }
    };
    document.addEventListener("scroll", checkInView);
    checkInView(); // check on start up in case we land on portfolio directly
    return () => document.removeEventListener("scroll", checkInView);
  }, [setLandingInView]);

  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const hoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#ef233c" : "#1a1a1a",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  function goToAbout() {
    document?.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div ref={targetRef} id="home" className="z-1 relative flex h-dvh w-dvw flex-col items-center justify-center gap-y-4 border-red-600 text-white">
      <div className="text-center xl:text-4xl 2xl:text-5xl">
        <div className="mb-2">
          Hello, I am <span className="text-primary">Karim</span>.
        </div>
        <div>I am a Software Engineer.</div>
      </div>
      <animated.button
        tabIndex={-1}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        type="button"
        onClick={goToAbout}
        style={hoverAnim}
        className="flex items-center rounded-sm justify-center gap-x-2 border-2 border-primary text-primary xl:h-12 xl:w-40 xl:text-lg 2xl:h-14 2xl:w-44 2xl:text-xl">
        <div>View my work</div>
        <FontAwesomeIcon className="text-base" icon={faArrowDown} />
      </animated.button>
    </div>
  );
};
