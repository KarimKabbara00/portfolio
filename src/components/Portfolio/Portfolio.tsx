import React from "react";
import { Title } from "../shared/Title";
import { PortfolioItem } from "./PortfolioItem";
import classicalPng from "../../portfolioImages/classicalLibrary.png";
import bradyPNG from "../../portfolioImages/bradyHumanities.png";

export const Portfolio = () => {
  const classicalDescription = "A classical music website built with ReactJS, Express.js, PostgreSQL, Supabase, Google Cloud Build & Run.";

  const bradyDescription = "A world-wide public humanities archive built with Django, TailwindCSS, MySQL, and Javascript.";
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum";

  const classicalObject = {
    title: "Classical Library",
    image: classicalPng,
    description: classicalDescription,
    weblink: "https://classical-library.com/",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
  };

  const netSimObj = {
    title: "Network Simulator",
    image: classicalPng,
    description: lorem,
    weblink: "",
    gitlink: "https://github.com/KarimKabbara00/Classical-Library",
  };

  const bradyObj = {
    title: "Brady Humanties Archive",
    image: bradyPNG,
    description: bradyDescription,
    weblink: "https://bradyhumanities.org/",
    gitlink: "",
  };

  return (
    <div className="w-dvw">
      <Title title="Portfolio" />
      <div className="flex flex-col gap-y-16 py-12">
        <PortfolioItem object={classicalObject} />
        <PortfolioItem object={netSimObj} />
        <PortfolioItem object={bradyObj} />
      </div>
    </div>
  );
};
