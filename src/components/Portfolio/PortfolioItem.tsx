import React from "react";
import { PortfolioCircleLink } from "./PortfolioCircleLink";
import github from "../../icons/portfolio/github.svg";
import globe from "../../icons/portfolio/globe.svg";

interface portfolioObejct {
  title: string;
  image: string;
  description: string;
  weblink: string;
  gitlink: string;
}

interface propTypes {
  object: portfolioObejct;
}

export const PortfolioItem: React.FC<propTypes> = ({ object }) => {
  return (
    <div className="flex w-full flex-col items-center px-16">
      <div className="flex w-full justify-evenly gap-x-10">
        <div className="relative w-1/2">
          <img className="relative z-10 rounded-xl shadow-2xl shadow-black" src={object.image} />
          {/* <div className="absolute top-0 z-0 h-full w-full rounded-lg bg-gradient-to-r from-primary to-primary"></div> */}
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-10 text-white">
          <div className="relative ml-16 w-fit self-start text-4xl">
            <div className="relative z-20">{object.title}</div>
            <div className="absolute -bottom-2 left-10 z-10 h-1 w-full bg-primary"></div>
          </div>

          <div className="px-16 text-xl">{object.description}</div>
          <div className="flex gap-x-5">
            {object.gitlink && <PortfolioCircleLink image={github} link={object.gitlink} />}
            {object.weblink && <PortfolioCircleLink image={globe} link={object.weblink} />}
          </div>
        </div>
      </div>
      {/* <div className="mt-12 h-1.5 w-1/2 rounded-xl bg-gradient-to-r from-primary to-secondary"></div> */}
    </div>
  );
};
