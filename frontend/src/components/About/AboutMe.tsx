import React, { useState, useEffect, useRef } from "react";
import { SkillItem } from "./SkillItem";
import { Title } from "../shared/Title";
import { SkillToggle } from "./SkillToggle";
import { animated, useSpring, config } from "@react-spring/web";
import { OtherSkill } from "./OtherSkill";
import reactSVG from "../../assets/icons/skills/react.svg";
import tsSVG from "../../assets/icons/skills/ts.svg";
import jsSVG from "../../assets/icons/skills/js.svg";
import expSVG from "../../assets/icons/skills/express.svg";
import tailSVG from "../../assets/icons/skills/tailwind.svg";
import htmlSVG from "../../assets/icons/skills/html.svg";
import cssSVG from "../../assets/icons/skills/css.svg";
import psqlSVG from "../../assets/icons/skills/psql.svg";
import supabaseSVG from "../../assets/icons/skills/supabase.svg";
import pySVG from "../../assets/icons/skills/py.svg";
import angSVG from "../../assets/icons/skills/angular.svg";
import restSVG from "../../assets/icons/skills/rest.svg";
import djangoSVG from "../../assets/icons/skills/django.svg";
import gcpSVG from "../../assets/icons/skills/gcp.svg";
import awsSVG from "../../assets/icons/skills/aws.svg";
import mysqlSVG from "../../assets/icons/skills/mysql.svg";
import gitSVG from "../../assets/icons/skills/git.svg";
import gradSVG from "../../assets/icons/skills/grad.svg";
import ciscoSVG from "../../assets/icons/skills/cisco.svg";
import secPlusSVG from "../../assets/icons/skills/sec+.svg";

import resume from "../../assets/Karim_Kabbara_Resume.pdf";


interface propTypes {
  aboutInView: boolean;
  setAboutInView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AboutMe: React.FC<propTypes> = ({ aboutInView, setAboutInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // show flag for hovering over portfolio images
  useEffect(() => {
    const checkInView = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
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
    scale: showFrontend ? 1 : 0,
    opacity: showFrontend ? 1 : 0,
    config: (key) => {
      if (key === "scale") {
        return { tension: 400, friction: 45 };
      } else return config.default;
    },
  });

  const animateBackend = useSpring({
    scale: !showFrontend ? 1 : 0,
    opacity: !showFrontend ? 1 : 0,
    config: (key) => {
      if (key === "scale") {
        return { tension: 400, friction: 45 };
      } else return config.default;
    },
  });

  const opacity = 0.7;

  return (
    <div ref={targetRef} id="about" className="z-1 relative flex min-h-dvh w-dvw flex-col pb-16">
      <Title title="About" />
      <div className="relative flex h-full midScreen:mt-10 midScreen:flex-col midScreen:items-center">
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-6 midScreen:w-11/12">
          <img className="mb-2 w-60 rounded-full border-2" src="https://karimkabbara00.github.io/assets/img/profile-img.jpg" alt="Karim Kabbara Portrait" />
          <div className="flex items-start justify-center gap-x-6">
            <OtherSkill name="B.S. in Computer Science" alt="B.S. in Computer Science" icon={gradSVG} size="h-14" animate />
            <OtherSkill
              name={
                <>
                  CCNA
                  <br />
                  (200-301)
                </>
              }
              alt="CCNA (200-301)"
              icon={ciscoSVG}
              size="h-14"
              animate
            />
            <OtherSkill name="Security+ (SY0-601)" alt="Security+ (SY0-601)" icon={secPlusSVG} size="h-14" animate />
          </div>
          <div className="flex w-4/6 flex-col gap-y-6 text-[1.1rem] text-white largeScreen:w-9/12 largeScreen:text-base midScreen:text-lg xsScreen:w-11/12 xsScreen:text-base">
            <p className="w-full leading-9 midScreen:leading-10">
              I am a computer science graduate with a strong passion for frontend development and an ambition to transition into full stack development. I am proficient in ReactJS, TypeScript,{" "}
              Express.js, and all things web development. I firmly believe in the growth mindset and the importance of continuous&nbsp; self-improvement. In my free time, I like to work on
              side-projects, play tennis, and practice the piano.
            </p>
            <p>
              View my resume&nbsp;
              <a href={resume} target="_blank" rel="noreferrer" className="cursor-pointer text-primary underline hover:text-secondary">
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="absolute left-1/2 top-[8%] h-[44rem] -translate-x-1/2 transform rounded-lg border-[0.1rem] border-neutral-700 largeScreen:h-[42rem] midScreen:hidden"></div>

        <div className="relative flex w-1/2 flex-col">
          <div className="absolute left-1/2 -translate-x-1/2 transform pt-20 text-4xl text-white xsScreen:pt-[5.5rem]">
            <SkillToggle setShowFrontend={setShowFrontend} showFrontend={showFrontend} />
          </div>
          {showFrontend && (
            <animated.div style={animateFrontend} className="mb-12 flex flex-col gap-y-8 xsScreen:gap-y-6">
              <div className="flex justify-center gap-x-10 pt-40 xsScreen:gap-x-4">
                <SkillItem text="ReactJS" imgLink={reactSVG} themeColor={`rgba(68, 181, 214, ${opacity})`} />
                <SkillItem text="Typescript" imgLink={tsSVG} themeColor={`rgba(38, 97, 185, ${opacity})`} />
              </div>
              <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                <SkillItem text="HTML" imgLink={htmlSVG} themeColor={`rgba(234, 78, 32, ${opacity})`} />
                <SkillItem text="Javascript" imgLink={jsSVG} themeColor={`rgba(244, 219, 24, ${opacity})`} />
                <SkillItem text="CSS" imgLink={cssSVG} themeColor={`rgba(43, 153, 212, ${opacity})`} />
              </div>
              <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                <SkillItem text="Angular" imgLink={angSVG} themeColor={`rgba(210, 0, 38, ${opacity})`} />
                <SkillItem text="TailwindCSS" imgLink={tailSVG} themeColor={`rgba(56, 153, 164, ${opacity})`} />
              </div>
            </animated.div>
          )}

          {!showFrontend && (
            <animated.div style={animateBackend} className="mb-12 flex flex-col gap-y-8 xsScreen:gap-y-6">
              <div className="flex justify-center gap-x-10 pt-40 xsScreen:gap-x-4">
                <SkillItem text="Express.js" imgLink={expSVG} themeColor={`rgba(255, 255, 255, ${opacity})`} />
                <SkillItem text="Django" imgLink={djangoSVG} themeColor={`rgba(9, 46, 32, ${opacity})`} />
              </div>
              <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                <SkillItem text="PostgreSQL" imgLink={psqlSVG} themeColor={`rgba(40, 83, 126, ${opacity})`} />
                <SkillItem text="MySQL" imgLink={mysqlSVG} themeColor={`rgba(0, 117, 143, ${opacity})`} />
                <SkillItem text="Supabase" imgLink={supabaseSVG} themeColor={`rgba(55, 200, 123, ${opacity})`} />
              </div>
              <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                <SkillItem text="Google Cloud Platform" imgLink={gcpSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                <SkillItem text="Amazon Web Services" imgLink={awsSVG} themeColor={`rgba(253, 135, 6, ${opacity})`} />
              </div>
            </animated.div>
          )}

          <div className="flex flex-col items-center gap-y-2">
            <div className="text-white">Other Skills:</div>
            <div className="flex w-full items-start justify-center gap-x-3 self-center text-white">
              <OtherSkill name="RESTful APIs" alt="RESTful APIs" icon={restSVG} />
              <OtherSkill name="Git" alt="Git" icon={gitSVG} />
              <OtherSkill name="Python" alt="Python" icon={pySVG} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
