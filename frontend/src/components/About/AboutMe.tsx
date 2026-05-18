import React, { useState, useEffect, useRef } from "react";
import { SkillItem } from "./SkillItem";
import { Title } from "../shared/Title";
import { SkillToggle, SkillCategory } from "./SkillToggle";
import { animated, useSpring, config } from "@react-spring/web";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { OtherSkill } from "./OtherSkill";
import nextjsSVG from "../../assets/icons/skills/nextjs.svg";
import reactSVG from "../../assets/icons/skills/react.svg";
import tsSVG from "../../assets/icons/skills/ts.svg";
import expSVG from "../../assets/icons/skills/express.svg";
import tanstackSVG from "../../assets/icons/skills/tanstack.svg";
import tailSVG from "../../assets/icons/skills/tailwind.svg";
import cssSVG from "../../assets/icons/skills/css.svg";
import psqlSVG from "../../assets/icons/skills/psql.svg";
import firebaseSVG from "../../assets/icons/skills/firebase.svg";
import pySVG from "../../assets/icons/skills/py.svg";
import restSVG from "../../assets/icons/skills/rest.svg";
import nodejsSVG from "../../assets/icons/skills/nodejs.svg";
import vercelSVG from "../../assets/icons/skills/vercel.svg";
import bigquerySVG from "../../assets/icons/skills/bigquery.svg";
import cloudRunSVG from "../../assets/icons/skills/cloudrun.svg";
import cloudTasksSVG from "../../assets/icons/skills/cloudtasks.svg";
import secretManagerSVG from "../../assets/icons/skills/secretmanager.svg";
import geminiSVG from "../../assets/icons/skills/gemini.svg";
import zustandSVG from "../../assets/icons/skills/zustand.svg";
import dockerSVG from "../../assets/icons/skills/docker.png";
import vitestSVG from "../../assets/icons/skills/vitest.svg";
import cloudSqlSVG from "../../assets/icons/skills/cloudsql.svg";
import cloudStorageSVG from "../../assets/icons/skills/cloudstorage.svg";
import prismaSVG from "../../assets/icons/skills/prisma.svg";
import gitSVG from "../../assets/icons/skills/git.svg";
import gradSVG from "../../assets/icons/skills/grad.svg";
import ciscoSVG from "../../assets/icons/skills/cisco.svg";
import secPlusSVG from "../../assets/icons/skills/sec+.svg";
import resume from "../../assets/Karim_Kabbara_Resume.pdf";
import me from "../../assets/me.jpg";

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

  const { ref: revealRef, style: revealStyle } = useScrollReveal(0.1);

  const [activeSkill, setActiveSkill] = useState<SkillCategory>("frontend");

  const springConfig = (key: string) => {
    if (key === "scale") return { tension: 400, friction: 45 };
    return config.default;
  };

  const animateFrontend = useSpring({
    scale: activeSkill === "frontend" ? 1 : 0,
    opacity: activeSkill === "frontend" ? 1 : 0,
    config: springConfig,
  });

  const animateBackend = useSpring({
    scale: activeSkill === "backend" ? 1 : 0,
    opacity: activeSkill === "backend" ? 1 : 0,
    config: springConfig,
  });

  const animateCloud = useSpring({
    scale: activeSkill === "google cloud" ? 1 : 0,
    opacity: activeSkill === "google cloud" ? 1 : 0,
    config: springConfig,
  });

  const opacity = 0.7;

  return (
    <div ref={targetRef} id="about" className="z-1 relative flex min-h-dvh w-dvw flex-col pb-16">
      <Title title="About" />
      <animated.div ref={revealRef} style={revealStyle} className="relative flex h-full midScreen:mt-10 midScreen:flex-col midScreen:items-center">
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-6 midScreen:w-11/12">
          <img className="mb-2 h-60 w-60 rounded-full border-2 border-white/20 object-cover transition-all duration-500 hover:border-primary hover:shadow-[0_0_20px_-4px_rgba(239,35,60,0.5)]" src={me} alt="Karim Kabbara Portrait" />
          <div className="flex items-start justify-center gap-x-6">
            <OtherSkill name="B.S. in Computer Science" alt="B.S. in Computer Science" icon={gradSVG} size="h-14" />
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
              I am a Fullstack Engineer with a strong passion for Web development. I am proficient in NextJS, TypeScript, Express.js, and all things web development. I firmly believe in the growth
              mindset and the importance of continuous self-improvement. In my free time, I like to work on side-projects, play tennis, and practice the piano. I'm always looking to grow my personal
              and professional network.
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

        <div className="relative flex w-1/2 flex-col items-center midScreen:w-full midScreen:mt-12">
          <div className="mb-10 pt-20 xsScreen:pt-[5.5rem]">
            <SkillToggle active={activeSkill} setActive={setActiveSkill} />
          </div>

          <div className="relative w-full min-h-[16rem]">
            {activeSkill === "frontend" && (
              <animated.div style={animateFrontend} className="flex flex-col gap-y-8 xsScreen:gap-y-6">
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Next.js" imgLink={nextjsSVG} themeColor={`rgba(68, 181, 214, ${opacity})`} />
                  <SkillItem text="React.js" imgLink={reactSVG} themeColor={`rgba(68, 181, 214, ${opacity})`} />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Typescript" imgLink={tsSVG} themeColor={`rgba(38, 97, 185, ${opacity})`} />
                  <SkillItem text="Tailwind" imgLink={tailSVG} themeColor={`rgba(56, 153, 164, ${opacity})`} />
                  <SkillItem text="CSS" imgLink={cssSVG} themeColor={`rgba(43, 153, 212, ${opacity})`} />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="React Query" imgLink={tanstackSVG} themeColor={`rgba(56, 153, 164, ${opacity})`} />
                  <SkillItem text="Zustand" imgLink={zustandSVG} themeColor={`rgba(234, 78, 32, ${opacity})`} />
                </div>
              </animated.div>
            )}

            {activeSkill === "backend" && (
              <animated.div style={animateBackend} className="flex flex-col gap-y-8 xsScreen:gap-y-6">
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Express.js" imgLink={expSVG} themeColor={`rgba(255, 255, 255, ${opacity})`} />
                  <SkillItem text="Firebase" imgLink={firebaseSVG} themeColor={`rgba(255, 160, 0, ${opacity})`} />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="PostgreSQL" imgLink={psqlSVG} themeColor={`rgba(40, 83, 126, ${opacity})`} />
                  <SkillItem text="RESTful APIs" imgLink={restSVG} themeColor={`rgba(100, 200, 100, ${opacity})`} />
                  <SkillItem text="Node.js" imgLink={nodejsSVG} themeColor={`rgba(9, 46, 32, ${opacity})`} />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Vercel AI SDK" imgLink={vercelSVG} themeColor={`rgba(255, 255, 255, ${opacity})`} />
                  <SkillItem text="Prisma ORM" imgLink={prismaSVG} themeColor={`rgba(0, 117, 143, ${opacity})`} />
                </div>
              </animated.div>
            )}

            {activeSkill === "google cloud" && (
              <animated.div style={animateCloud} className="flex flex-col gap-y-8 xsScreen:gap-y-6">
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Cloud Run" imgLink={cloudRunSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                  <SkillItem text="Cloud Tasks" imgLink={cloudTasksSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Cloud SQL" imgLink={cloudSqlSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                  <SkillItem text="Cloud Storage" imgLink={cloudStorageSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                  <SkillItem text="BigQuery" imgLink={bigquerySVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                </div>
                <div className="flex justify-center gap-x-10 xsScreen:gap-x-4">
                  <SkillItem text="Secret Manager" imgLink={secretManagerSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                  <SkillItem text="Gemini" imgLink={geminiSVG} gradientColor="conic-gradient(#4285F4 25%, #EA4335 25%, #EA4335 50%, #FBBC05 50%, #FBBC05 75%, #34A853 75%)" />
                </div>
              </animated.div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-y-4">
            <div className="text-sm uppercase tracking-widest text-white/50">Other Skills</div>
            <div className="flex w-full items-start justify-center gap-x-3 self-center text-white xxsScreen:gap-x-px">
              <OtherSkill name="Git" alt="Git" icon={gitSVG} />
              <OtherSkill name="Python" alt="Python" icon={pySVG} />
              <OtherSkill name="Docker" alt="Docker" icon={dockerSVG} />
              <OtherSkill name="Vitest" alt="Vitest" icon={vitestSVG} />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
