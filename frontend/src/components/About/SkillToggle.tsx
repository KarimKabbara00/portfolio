import { useSpring, animated, config } from "@react-spring/web";
import React from "react";

interface propType {
  showFrontend: boolean;
  setShowFrontend: (frontOrBack: boolean) => void;
}

export const SkillToggle: React.FC<propType> = ({ showFrontend, setShowFrontend }) => {
  const slideBar = useSpring({
    transform: showFrontend ? "translate(7%, 14%)" : "translate(112%, 14%)",
    width: showFrontend ? "5.85rem" : "5.7rem",
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
    <div className="relative flex select-none gap-x-3 rounded-xl border-2 border-zinc-700 bg-neutral-900 text-xl shadow-inner">
      <animated.div className="relative z-20 cursor-pointer py-2.5 pl-2.5" onClick={() => setShowFrontend(true)} style={frontendOpacity}>
        Frontend
      </animated.div>

      <animated.div className="relative z-20 cursor-pointer py-2.5 pr-2.5" onClick={() => setShowFrontend(false)} style={backendOpacity}>
        <div className="relative z-20">Backend</div>
      </animated.div>
      <animated.div style={slideBar} className="absolute z-10 h-[79%] rounded-lg bg-zinc-800"></animated.div>
    </div>
  );
};
