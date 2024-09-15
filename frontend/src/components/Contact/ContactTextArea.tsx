import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface propTypes {
  value: string;
  onChange: (value: string) => void;
}

export const ContactTextArea: React.FC<propTypes> = ({ value, onChange }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const moveLabel = useSpring({
    transform: focused ? "translate(0%, -55%)" : "translate(0%, 25%)",
    fontSize: focused ? "0.85rem" : "1rem",
    background: focused ? "linear-gradient(180deg, #141516 65%, #262626 35%)" : "linear-gradient(180deg, #262626 50%, #262626 50%)",
    config: (key) => {
      if (key === "background") {
        return focused ? { duration: 150 } : { duration: 250 };
      } else {
        return config.default;
      }
    },
  });

  return (
    <div className="relative h-48 w-full rounded-sm bg-gradient-to-r from-primary via-primary to-secondary p-[0.1rem]">
      <animated.label style={{ ...moveLabel }} htmlFor="message" className="pointer-events-none absolute inset-x-0 top-0 z-30 ml-1.5 w-fit rounded-sm px-1 text-lg text-textPlaceholder">
        Message
      </animated.label>
      <textarea
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false || value.length > 0)}
        name="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-full w-full resize-none rounded-sm bg-neutral-800 px-2 pt-1.5 focus:border-0 focus:outline-none"
        required
      />
    </div>
  );
};
