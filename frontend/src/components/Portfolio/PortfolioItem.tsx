import React from "react";
import { PortfolioLink } from "./PortfolioLink";
import github from "../../assets/icons/portfolio/github.svg";
import globe from "../../assets/icons/portfolio/globe.svg";
import down from "../../assets/icons/portfolio/down.svg";
import { PortfolioTechnology } from "./PortfolioTechnology";
import { useMediaQuery } from "react-responsive";
import { PortfolioObject } from "./Portfolio";

interface Props {
  object: PortfolioObject;
}

export const PortfolioItem: React.FC<Props> = ({ object }) => {
  const isMidScreen = useMediaQuery({ query: "(max-width: 1300px)" });

  return (
    <div className="mt-4 grid w-fit grid-cols-2 gap-12 pl-10 midScreen:grid-cols-1 midScreen:gap-5 midScreen:pl-0">
      {isMidScreen && <div className="relative z-20 self-start text-4xl text-white xsScreen:text-[2rem]">{object.title}</div>}
      <img className="h-full w-full border-2 border-primary object-cover shadow-portfolioImage" src={object.image} alt={object.title} />
      <div className="mx-2 flex w-11/12 flex-col items-center text-white midScreen:mx-0">
        {!isMidScreen && (
          <div className="relative w-fit self-start">
            <div className="relative z-20 pb-4 text-4xl">{object.title}</div>
          </div>
        )}
        <div className="flex self-start pb-3">
          <div className="flex w-[45rem] flex-wrap items-center portfolioTechWidth:w-[26rem] portfolioTechWidthXs:w-[24rem]">
            <div className="mr-4 text-xl text-white xsScreen:mr-2 xsScreen:text-lg">Made&nbsp;with:</div>
            {object.tech.map((tech, key, object) => (
              <PortfolioTechnology tech={tech} key={key} slash={object.length - 1 !== key} />
            ))}
          </div>
        </div>
        <div className="self-start xlScreen:text-xl xlScreen:leading-10 portfolioTextWidth:text-lg portfolioTextWidth:leading-9 midScreen:w-full midScreen:text-lg midScreen:leading-8 smallScreen:w-full xsScreen:w-[110%]">
          {object.description}
        </div>

        <div className="flex w-full justify-start gap-x-5 pt-6 midScreen:pt-4">
          {object.gitlink && <PortfolioLink image={github} link={object.gitlink} type="Code" />}
          {object.weblink && <PortfolioLink image={globe} link={object.weblink} type="Live" />}
          {object.downlink && <PortfolioLink image={down} link={object.downlink} type="Try it" />}
        </div>
      </div>
    </div>
  );
};
