import { useSpring, animated, config } from "@react-spring/web";
import React from "react";

export type SkillCategory = "frontend" | "backend" | "google cloud";

interface propType {
  active: SkillCategory;
  setActive: (category: SkillCategory) => void;
}

export const SkillToggle: React.FC<propType> = ({ active, setActive }) => {
  const categories: SkillCategory[] = ["frontend", "backend", "google cloud"];
  const activeIndex = categories.indexOf(active);

  const slide = useSpring({
    transform: `translateX(${activeIndex * 100}%)`,
    config: { tension: 300, friction: 30 },
  });

  const getStyles = (category: SkillCategory) => ({
    opacity: active === category ? 1 : 0.4,
    color: active === category ? "#ef233c" : "#ffffff",
  });

  const frontendStyles = useSpring({ ...getStyles("frontend"), config: config.default });
  const backendStyles = useSpring({ ...getStyles("backend"), config: config.default });
  const cloudStyles = useSpring({ ...getStyles("google cloud"), config: config.default });

  return (
    <div className="relative grid w-fit select-none grid-cols-3 rounded-full bg-white/[0.06] p-1 text-lg font-medium backdrop-blur-sm">
      <animated.div
        style={slide}
        className="absolute inset-y-1 left-1 w-[calc(33.33%-2px)] rounded-full bg-primary/20 ring-1 ring-primary/40"
      />
      <animated.button
        style={frontendStyles}
        onClick={() => setActive("frontend")}
        className="relative z-10 cursor-pointer rounded-full px-5 py-2 text-center"
      >
        Frontend
      </animated.button>
      <animated.button
        style={backendStyles}
        onClick={() => setActive("backend")}
        className="relative z-10 cursor-pointer rounded-full px-5 py-2 text-center"
      >
        Backend
      </animated.button>
      <animated.button
        style={cloudStyles}
        onClick={() => setActive("google cloud")}
        className="relative z-10 cursor-pointer rounded-full px-5 py-2 text-center"
      >
        Google Cloud
      </animated.button>
    </div>
  );
};
