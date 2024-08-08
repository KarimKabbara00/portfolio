import React from "react";
import { PortfolioLink } from "./PortfolioLink";
import github from "../../icons/portfolio/github.svg";
import globe from "../../icons/portfolio/globe.svg";
import down from "../../icons/portfolio/down.svg";
import { PortfolioTechnology } from "./PortfolioTechnology";

interface portfolioObejct {
  title: string;
  image: string;
  description: string;
  weblink: string;
  gitlink: string;
  downlink: string;
  tech: string[];
}

interface propTypes {
  object: portfolioObejct;
}

export const PortfolioItem: React.FC<propTypes> = ({ object }) => {
  return (
    <div className="grid grid-cols-2 2xl:gap-10 xl:gap-8 xl:pl-10">
      <img className="xl:h-11/12 relative z-10 rounded-sm border-2 border-primary shadow-portfolioImage 2xl:h-full" src={object.image} alt={object.title + " image"} />
      <div className="mx-2 flex w-11/12 flex-col items-center text-white">
        <div className="relative w-fit self-start">
          <div className="relative z-20 xl:pb-2 xl:text-3xl 2xl:pb-4 2xl:text-5xl">{object.title}</div>
        </div>
        <div className="flex self-start xl:pb-2 2xl:pb-3">
          <div className="mr-4 text-tertiary xl:text-lg 2xl:text-2xl">Made&nbsp;with:</div>
          <div className="flex flex-wrap xl:w-[28rem] 2xl:w-[40rem] 2xl:pt-0.5">
            {object.tech.map((tech, key, object) => (
              <PortfolioTechnology tech={tech} key={key} slash={object.length - 1 !== key} />
            ))}
          </div>
        </div>
        <div className="w-full xl:text-lg xl:leading-8 2xl:text-2xl 2xl:leading-10">{object.description}</div>

        <div className="flex w-full justify-start xl:gap-x-3 xl:pt-4 2xl:gap-x-5 2xl:pt-6">
          {object.gitlink && <PortfolioLink image={github} link={object.gitlink} type="Code" />}
          {object.weblink && <PortfolioLink image={globe} link={object.weblink} type="Live" />}
          {object.downlink && <PortfolioLink image={down} link={object.weblink} type="Try it" />}
        </div>
      </div>
    </div>
  );
};
