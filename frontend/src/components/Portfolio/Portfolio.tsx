import React, { useEffect, useRef } from "react";
import { Title } from "../shared/Title";
import { PortfolioItem } from "./PortfolioItem";
import classicalPNG from "../../assets/portfolioImages/classicalLibrary.png";
// import netSimPNG from "../../assets/portfolioImages/netSim.png";
import bradyPNG from "../../assets/portfolioImages/bradyHumanities.png";
import realEContracts from "../../assets/portfolioImages/realEContracts.png";

export interface PortfolioObject {
  title: string;
  image: string;
  description: string;
  weblink: string;
  gitlink: string;
  downlink: string;
  tech: string[];
}

interface propTypes {
  setPortfolioInView: (inView: boolean) => void;
}

export const Portfolio: React.FC<propTypes> = ({ setPortfolioInView }) => {
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

  const realEContractsDescription =
    "Real eContracts is a full-stack real estate contract management platform built with Next.js, Express.js, and Google Cloud Platform. It streamlines the creation, signing, and tracking of legally binding contracts through secure workflows, dynamic PDFs, and simplified client access.";

  const classicalDescription =
    "A classical music website featuring over 200 composers, 25,000 works, and a built-in music player. Explore the world of classical music with unique composer profiles, trivia, and an interactive map of birth locations.";
  // const netSimDescription =
  //   "A network simulator built with Python and Tkinter, inspired by Cisco's Packet Tracer. Build and test network topologies with protocols inlcuding IPv4 addressing, default gateways, static routing, DHCP, and more.";
  const bradyDescription =
    "A world-wide public humanities archive allowing people from all over the globe to share how their ongoing efforts in bettering their communities. Explore a variety of humanities projects and placemaking initiatives.";

  const realEContractsObject: PortfolioObject = {
    title: "RealeContracts",
    image: realEContracts,
    description: realEContractsDescription,
    weblink: "https://realecontracts.com/",
    gitlink: "",
    downlink: "",
    tech: ["NextJS", "Express.js", "TailwindCSS", "PostgreSQL", "Google Cloud Platform"],
  };

  const classicalObject: PortfolioObject = {
    title: "Classical Library",
    image: classicalPNG,
    description: classicalDescription,
    weblink: "https://classical-library.com/",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
    downlink: "",
    tech: ["ReactJS", "CSS", "Express.js", "PostgreSQL"],
  };

  // const netSimObj: PortfolioObject = {
  //   title: "Network Simulator",
  //   image: netSimPNG,
  //   description: netSimDescription,
  //   weblink: "",
  //   gitlink: "https://github.com/KarimKabbara00/Network-Simulator",
  //   downlink: "https://drive.google.com/file/d/18sNZ7lrhS2Z3DKwuyNRBzH7JE_aVJ2UA/view?usp=drive_link",
  //   tech: ["Python", "Tkinter"],
  // };

  const bradyObj: PortfolioObject = {
    title: "Brady Humanties Archive",
    image: bradyPNG,
    description: bradyDescription,
    weblink: "https://bradyhumanities.org/",
    gitlink: "",
    downlink: "",
    tech: ["Django", "Javascript", "MySQL", "TailwindCSS"],
  };

  return (
    <div ref={targetRef} id="portfolio" className="-z-1 relative min-h-dvh w-dvw px-4">
      <Title title="Portfolio" />
      <div className="mt-12 flex flex-col gap-y-16 pb-16 pt-3 midScreen:gap-y-14 midScreen:pt-0">
        <PortfolioItem object={realEContractsObject} />
        <PortfolioItem object={classicalObject} />
        {/* <PortfolioItem object={netSimObj} /> */}
        <PortfolioItem object={bradyObj} />
      </div>
    </div>
  );
};
