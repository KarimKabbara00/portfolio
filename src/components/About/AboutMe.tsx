import React, { useState } from "react";
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

export const AboutMe = () => {
  const [showFrontend, setShowFrontend] = useState<boolean>(true);

  const animateFrontend = useSpring({
    opacity: showFrontend ? 1 : 0,
  });

  const animateBackend = useSpring({
    opacity: !showFrontend ? 1 : 0,
  });

  const test = {};

  return (
    <div className="h-dvh w-dvw border-2">
      <Title title="About" />
      <div className="flex h-[calc(100dvh-8rem)] px-24">
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-10">
          <img className="rounded-full" src="https://karimkabbara00.github.io/assets/img/profile-img.jpg" width="225px" />
          <div className="w-3/5 text-lg leading-9 text-white">
            I am a computer science graduate with a strong passion for frontend development and an <span className="text-secondary">ambition</span> to
            transition into full stack development. I am proficient in <span className="text-secondary">ReactJS</span>,&nbsp;
            <span className="text-secondary">Express.js</span>, <span className="text-secondary">JavaScript</span>, and all things web development. I firmly
            believe in the <span className="text-secondary">growth mindset</span> and the importance of continuous&nbsp;
            <span className="text-secondary">self-improvement</span>. I am never faced with a challenge I cannot overcome. In my free time, I like to work on
            side-projects, play tennis, and play the piano.
            <br />
            <br />
            View my resume here.
          </div>
        </div>

        <div className="relative flex w-1/2 flex-col gap-y-16">
          <div className="absolute left-1/2 -translate-x-1/2 transform pt-16 text-4xl text-white">
            <SkillToggle setShowFrontend={setShowFrontend} showFrontend={showFrontend} />
          </div>
          {showFrontend && (
            <animated.div style={animateFrontend} className="flex flex-col gap-y-12">
              <div className="flex justify-center gap-x-16 pt-40">
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
            <animated.div style={animateBackend} className="flex flex-col items-center gap-y-16 pt-40">
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
