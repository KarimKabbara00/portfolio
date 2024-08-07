import React, { useState, useEffect, useRef } from "react";
import { SkillItem } from "./SkillItem";
import reactSVG from "../../icons/skills/react.svg";
import tsSVG from "../../icons/skills/ts.svg";
import jsSVG from "../../icons/skills/js.svg";
import expSVG from "../../icons/skills/express.svg";
import tailSVG from "../../icons/skills/tailwind.svg";
import htmlSVG from "../../icons/skills/html.svg";
import cssSVG from "../../icons/skills/css.svg";
import psqlSVG from "../../icons/skills/psql.svg";
import pySVG from "../../icons/skills/py.svg";
import angSVG from "../../icons/skills/angular.svg";
import restSVG from "../../icons/skills/rest.svg";
import djangoSVG from "../../icons/skills/django.svg";
import { Title } from "../shared/Title";
import { SkillToggle } from "./SkillToggle";
import { animated, useSpring } from "@react-spring/web";

interface propTypes {
  aboutInView: boolean;
  setAboutInView: (inView: boolean) => void;
}

export const AboutMe: React.FC<propTypes> = ({ aboutInView, setAboutInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // show flag for hovering over portfolio images
  useEffect(() => {
    const checkInView = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        // const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const inView = rect.top <= 75 && rect.left >= 0 && rect.bottom >= 75 && rect.right <= windowWidth;
        setAboutInView(inView);
      }
    };
    document.addEventListener("scroll", checkInView);
    checkInView(); // check on start up in case we land on portfolio directly
    return () => document.removeEventListener("scroll", checkInView);
  }, [setAboutInView]);

  const [showFrontend, setShowFrontend] = useState<boolean>(true);

  const animateFrontend = useSpring({
    opacity: showFrontend ? 1 : 0,
  });

  const animateBackend = useSpring({
    opacity: !showFrontend ? 1 : 0,
  });

  return (
    <div ref={targetRef} id="about" className="relative min-h-dvh w-dvw">
      <Title title="About" />
      <div className="flex flex-row xl:flex-col xl:items-center 2xl:flex-row">
        <div className="flex flex-col items-center justify-center gap-y-10 xl:w-3/5 2xl:w-1/2">
          <img className="rounded-full shadow-2xl shadow-primary xl:my-2" src="https://karimkabbara00.github.io/assets/img/profile-img.jpg" width="225px" alt="Karim Kabbara Portrait" />
          {/* <div>Karim Kabbara</div> */}
          <div className="xl:leading-9 text-white xl:w-full xl:text-base xl:leading-8 2xl:w-3/5 2xl:text-lg">
            I am a computer science graduate with a strong passion for frontend development and an ambition to transition into full stack development. I am proficient in ReactJS,&nbsp; Express.js,
            JavaScript, and all things web development. I firmly believe in the growth mindset and the importance of continuous&nbsp; self-improvement. I am never faced with a challenge I cannot
            overcome. In my free time, I like to work on side-projects, play tennis, and play the piano.
            <br />
            <br />
            View my resume <a className="cursor-pointer text-primary underline hover:text-secondary">here</a>.
          </div>
        </div>

        <div className="relative flex w-1/2 flex-col">
          <div className="absolute left-1/2 -translate-x-1/2 transform pt-16 text-4xl text-white">
            <SkillToggle setShowFrontend={setShowFrontend} showFrontend={showFrontend} />
          </div>
          {showFrontend && (
            <animated.div style={animateFrontend} className="flex flex-col xl:mb-16 xl:gap-y-8 2xl:gap-y-12">
              <div className="flex justify-center gap-x-16 xl:pt-36 2xl:pt-40">
                <SkillItem text="ReactJS" imgLink={reactSVG} />
                <SkillItem text="Angular" imgLink={angSVG} />
                <SkillItem text="Typescript" imgLink={tsSVG} />
              </div>

              <div className="flex justify-center gap-x-16">
                <SkillItem text="RESTful APIs" imgLink={restSVG} />
                <SkillItem text="TailwindCSS" imgLink={tailSVG} />
              </div>
              <div className="flex justify-center gap-x-16">
                <SkillItem text="HTML" imgLink={htmlSVG} />
                <SkillItem text="Javascript" imgLink={jsSVG} />
                <SkillItem text="CSS" imgLink={cssSVG} />
              </div>
            </animated.div>
          )}

          {!showFrontend && (
            <animated.div style={animateBackend} className="flex flex-col items-center gap-y-16 pt-40 xl:pb-24">
              <div className="flex gap-x-16">
                <SkillItem text="Express.js" imgLink={expSVG} />
                <SkillItem text="Python" imgLink={pySVG} />
              </div>
              <div className="flex gap-x-16">
                <SkillItem text="PostgreSQL" imgLink={psqlSVG} />
                <SkillItem text="Django" imgLink={djangoSVG} />
              </div>
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
};
