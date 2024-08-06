import React from "react";
import { PortfolioLink } from "./PortfolioLink";
import github from "../../icons/portfolio/github.svg";
import globe from "../../icons/portfolio/globe.svg";
import { PortfolioTechnology } from "./PortfolioTechnology";

interface portfolioObejct {
  title: string;
  image: string;
  description: string;
  weblink: string;
  gitlink: string;
  tech: string[];
}

interface propTypes {
  object: portfolioObejct;
}

export const PortfolioItem: React.FC<propTypes> = ({ object }) => {
  return (
    <div className="flex w-full flex-col items-center px-16">
      <div className="flex w-full justify-evenly gap-x-14">
        <div className="relative w-1/2 rounded-xl border-2 border-primary">
          <img className="shadow-portfolioImage relative z-10 rounded-xl" src={object.image} />
          {/* <div className="absolute top-0 z-0 h-full w-full rounded-lg bg-gradient-to-r from-primary to-primary"></div> */}
        </div>

        <div className="mx-2 flex w-1/2 flex-col items-center text-white">
          <div className="relative w-fit self-start">
            <div className="relative z-20 pb-4 xl:text-4xl 2xl:text-5xl">{object.title}</div>
          </div>
          <div className="flex self-start pb-3 text-2xl">
            <div className="mr-4">Made with:</div>
            {object.tech.map((tech, key, object) => (
              <PortfolioTechnology tech={tech} key={key} slash={object.length - 1 !== key} />
            ))}
          </div>
          <div className="text-2xl leading-10">{object.description}</div>

          <div className="flex w-full justify-start gap-x-5 pt-6">
            {object.gitlink && <PortfolioLink image={github} link={object.gitlink} type="Code" />}
            {object.weblink && <PortfolioLink image={globe} link={object.weblink} type="Live" />}
          </div>
        </div>
      </div>
    </div>
  );
};
