import React, { useEffect, useRef, useState } from "react";
import { Title } from "../shared/Title";
import { PortfolioItem } from "./PortfolioItem";
import classicalPng from "../../portfolioImages/classicalLibrary.png";
import bradyPNG from "../../portfolioImages/bradyHumanities.png";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  portfolioInView: boolean;
  setPortfolioInView: (inView: boolean) => void;
}

export const Portfolio: React.FC<propTypes> = ({ portfolioInView, setPortfolioInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // show flag for hovering over portfolio images

  const checkInView = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const inView = rect.top <= 75 && rect.left >= 0 && rect.bottom >= windowHeight && rect.right <= windowWidth;
      setPortfolioInView(inView);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", checkInView);
    checkInView();
    return () => document.removeEventListener("scroll", checkInView);
  }, []);

  const classicalDescription =
    "A classical music website featuring over 200 composers, 25,000 classical works and a built in music player. Explore the world of classical music by viewing composer descriptions, playing classical trivia, or exploring birth locations on an interactive map.";
  const netSimDescription =
    "A network simulator built with Python and Tkinter, inspired by Cisco's Packet Tracer. Build and test network topologies with protocols inlcuding IPv4 addressing, default gateways, static routing, DHCP, and more!";
  const bradyDescription = "A world-wide public humanities archive. A world-wide public humanities archive. A world-wide public humanities archive.";

  const classicalObject = {
    title: "Classical Library",
    image: classicalPng,
    description: classicalDescription,
    weblink: "https://classical-library.com/",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
    tech: ["ReactJS", "Express.js", "PostgreSQL", "Supabase"],
  };

  const netSimObj = {
    title: "Network Simulator",
    image: classicalPng,
    description: netSimDescription,
    weblink: "",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
    tech: ["Python", "Tkinter"],
  };

  const bradyObj = {
    title: "Brady Humanties Archive",
    image: bradyPNG,
    description: bradyDescription,
    weblink: "https://bradyhumanities.org/",
    gitlink: "",
    tech: ["Django", "TailwindCSS", "MySQL", "Javascript"],
  };

  const showFlag = useSpring({
    from: { transform: portfolioInView ? "translateX(100%)" : "translateX(-2%)" },
    to: { transform: portfolioInView ? "translateX(2%)" : "translateX(100%)" },
  });

  return (
    <div ref={targetRef} id="portfolio" className="relative min-h-dvh w-dvw px-10">
      <Title title="Portfolio" />
      <animated.div style={showFlag} className="absolute right-0 flex items-center border-2 border-primary p-4 pr-5 text-white">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-xl text-primary" />
        Hover over an image to view a quick demo.
      </animated.div>
      <div className="mt-12 flex flex-col gap-y-24 py-12">
        <PortfolioItem object={classicalObject} />
        <PortfolioItem object={netSimObj} />
        <PortfolioItem object={bradyObj} />
      </div>
    </div>
  );
};
