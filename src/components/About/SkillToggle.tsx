import { useSpring, animated, config } from "@react-spring/web";
import React from "react";

interface propType {
  showFrontend: boolean;
  setShowFrontend: (frontOrBack: boolean) => void;
}

export const SkillToggle: React.FC<propType> = ({ showFrontend, setShowFrontend }) => {
  const slideBar = useSpring({
    from: { transform: showFrontend ? "translateX(111%)" : "translateX(-3.5%)", width: showFrontend ? "6.5rem" : "7rem" },
    to: { transform: showFrontend ? "translateX(-3.5%)" : "translateX(111%)", width: showFrontend ? "7rem" : "6.5rem" },
    config: { tension: 1000, friction: 100 },
  });

  const frontendOpacity = useSpring({
    opacity: showFrontend ? 1 : 0.3,
    config: config.default,
  });
  const backendOpacity = useSpring({
    opacity: showFrontend ? 0.3 : 1,
    config: config.default,
  });

  return (
    <div className="relative flex select-none gap-x-4 rounded-xl border-2 border-zinc-700 bg-neutral-900 px-3 py-1.5 text-2xl shadow-inner">
      <animated.div className="z-20 cursor-pointer" onClick={() => setShowFrontend(true)} style={frontendOpacity}>
        Frontend
      </animated.div>

      <animated.div className="z-20 cursor-pointer" onClick={() => setShowFrontend(false)} style={backendOpacity}>
        Backend
      </animated.div>
      <animated.div style={slideBar} className="absolute z-10 h-[2.1rem] w-[7rem] rounded-lg bg-neutral-800"></animated.div>
    </div>
  );
};
