import React, { useEffect, useRef } from "react";
import { Title } from "../shared/Title";
import { PortfolioItem } from "./PortfolioItem";
import classicalPNG from "../../assets/portfolioImages/classicalLibrary.png";
import netSimPNG from "../../assets/portfolioImages/netSim.png";
import bradyPNG from "../../assets/portfolioImages/bradyHumanities.png";
// import { useSpring, animated } from "@react-spring/web";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  portfolioInView: boolean;
  setPortfolioInView: (inView: boolean) => void;
}

export const Portfolio: React.FC<propTypes> = ({ portfolioInView, setPortfolioInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // show flag for hovering over portfolio images
  useEffect(() => {
    const checkInView = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        // const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const inView = rect.top <= 75 && rect.left >= 0 && rect.bottom >= 75 && rect.right <= windowWidth;
        setPortfolioInView(inView);
      }
    };
    document.addEventListener("scroll", checkInView);
    checkInView(); // check on start up in case we land on portfolio directly
    return () => document.removeEventListener("scroll", checkInView);
  }, [setPortfolioInView]);

  const classicalDescription =
    "A classical music website featuring over 200 composers, 25,000 works, and a built-in music player. Explore the world of classical music with unique composer profiles, trivia, and an interactive map of birth locations.";
  const netSimDescription =
    "A network simulator built with Python and Tkinter, inspired by Cisco's Packet Tracer. Build and test network topologies with protocols inlcuding IPv4 addressing, default gateways, static routing, DHCP, and more.";
  const bradyDescription =
    "A world-wide public humanities archive allowing people from all over the globe to share how their ongoing efforts in bettering their communities. Explore a variety of humanities projects and placemaking initiatives.";

  const classicalObject = {
    title: "Classical Library",
    image: classicalPNG,
    description: classicalDescription,
    weblink: "https://classical-library.com/",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
    downlink: "",
    tech: ["ReactJS", "CSS", "Express.js", "PostgreSQL"],
  };

  const netSimObj = {
    title: "Network Simulator",
    image: netSimPNG,
    description: netSimDescription,
    weblink: "",
    gitlink: "https://github.com/KarimKabbara00/Network-Simulator",
    downlink: "https://drive.google.com/file/d/18sNZ7lrhS2Z3DKwuyNRBzH7JE_aVJ2UA/view?usp=drive_link",
    tech: ["Python", "Tkinter"],
  };

  const bradyObj = {
    title: "Brady Humanties Archive",
    image: bradyPNG,
    description: bradyDescription,
    weblink: "https://bradyhumanities.org/",
    gitlink: "",
    downlink: "",
    tech: ["Django", "Javascript", "MySQL", "TailwindCSS"],
  };

  // const showFlag = useSpring({
  //   from: { transform: portfolioInView ? "translateX(100%)" : "translateX(-2%)" },
  //   to: { transform: portfolioInView ? "translateX(2%)" : "translateX(100%)" },
  // });

  return (
    <div ref={targetRef} id="portfolio" className="-z-1 relative min-h-dvh w-dvw px-4">
      <Title title="Portfolio" />
      {/* <animated.div style={showFlag} className="absolute right-0 top-28 flex items-center rounded-sm border-2 border-primary text-white xl:p-3 xl:pr-8 2xl:p-4 2xl:pr-5">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-primary xl:text-lg 2xl:text-xl" />
        Hover over an image to view a quick demo.
      </animated.div> */}
      <div className="midScreen:pt-0 mt-12 flex flex-col midScreen:gap-y-14 gap-y-16 pb-16 pt-3">
        <PortfolioItem object={classicalObject} />
        <PortfolioItem object={netSimObj} />
        <PortfolioItem object={bradyObj} />
      </div>
    </div>
  );
};
