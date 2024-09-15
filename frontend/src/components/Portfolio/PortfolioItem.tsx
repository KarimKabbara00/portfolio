import React from "react";
import { PortfolioLink } from "./PortfolioLink";
import github from "../../assets/icons/portfolio/github.svg";
import globe from "../../assets/icons/portfolio/globe.svg";
import down from "../../assets/icons/portfolio/down.svg";
import { PortfolioTechnology } from "./PortfolioTechnology";
import { useMediaQuery } from "react-responsive";

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
  const isMidScreen = useMediaQuery({ query: "(max-width: 1300px)" });

  return (
    <div className="midScreen:gap-5 midScreen:grid-cols-1 xsScreen:pl-0 mt-4 grid grid-cols-2 gap-12 pl-20">
      {isMidScreen && <div className="xsScreen:text-[2rem] relative z-20 self-start text-4xl text-white">{object.title}</div>}
      <img className="midScreen:w-11/12 xsScreen:w-full min-h-[100%] border-2 relative z-10 rounded-sm border-2 border-primary shadow-portfolioImage" src={object.image} alt={object.title + " image"} />
      <div className="midScreen:mx-0 mx-2 flex w-11/12 flex-col items-center text-white">
        {!isMidScreen && (
          <div className="relative w-fit self-start">
            <div className="relative z-20 pb-4 text-4xl">{object.title}</div>
          </div>
        )}
        <div className="flex self-start pb-3">
          <div className="portfolioTechWidth:w-[26rem] portfolioTechWidthXs:w-[24rem] flex w-[45rem] flex-wrap items-center">
            <div className="xsScreen:mr-2 xsScreen:text-lg mr-4 text-xl text-white">Made&nbsp;with:</div>
            {object.tech.map((tech, key, object) => (
              <PortfolioTechnology tech={tech} key={key} slash={object.length - 1 !== key} />
            ))}
          </div>
        </div>
        <div className="xlScreen:text-xl portfolioTextWidth:text-lg portfolioTextWidth:leading-9 xlScreen:leading-10 midScreen:leading-8 midScreen:text-lg smallScreen:w-full xsScreen:w-[110%] midScreen:w-full self-start">
          {object.description}
        </div>

        <div className="midScreen:pt-4 flex w-full justify-start gap-x-5 pt-6">
          {object.gitlink && <PortfolioLink image={github} link={object.gitlink} type="Code" />}
          {object.weblink && <PortfolioLink image={globe} link={object.weblink} type="Live" />}
          {object.downlink && <PortfolioLink image={down} link={object.downlink} type="Try it" />}
        </div>
      </div>
    </div>
  );
};
