import React, { useState } from "react";
import "../../index.css";
import { useSpring, animated, config } from "@react-spring/web";

interface propTypes {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const ContactField: React.FC<propTypes> = ({ value, placeholder, onChange }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const moveLabel = useSpring({
    transform: focused ? "translate(0%, -125%)" : "translate(0%, -50%)",
    fontSize: focused ? "0.85rem" : "1rem",
    background: focused ? "linear-gradient(180deg, #141516 50%, #262626 50%)" : "linear-gradient(180deg, #262626 50%, #262626 50%)",
    config: (key) => {
      if (key === "background") {
        return focused ? { duration: 150 } : { duration: 250 };
      } else {
        return config.default;
      }
    },
  });

  return (
    <div className={`relative z-10 w-full rounded-md transition-shadow duration-300 ${focused ? "shadow-[0_0_12px_-2px_rgba(239,35,60,0.4)]" : ""} bg-gradient-to-r from-primary via-primary to-secondary p-[0.1rem]`}>
      <animated.label
        style={{ ...moveLabel }}
        htmlFor={placeholder}
        className="text-textPlaceholder pointer-events-none absolute inset-x-0 top-1/2 z-30 ml-2.5 w-fit transform rounded-sm px-1 text-lg">
        {placeholder}
      </animated.label>
      <input
        autoComplete="false"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false || value.length > 0)}
        name={placeholder}
        className="relative z-20 h-10 w-full rounded-md bg-neutral-800 px-3 text-white focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};
