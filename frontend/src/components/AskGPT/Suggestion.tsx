import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface Props {
  text: string;
  handleSuggestionClick: (p: string) => void;
  responseComplete: boolean;
}

export const Suggestion: React.FC<Props> = ({ text, handleSuggestionClick, responseComplete }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const buttonAnim = useSpring({
    backgroundColor: hovered && responseComplete ? "rgba(239, 35, 60, 0.15)" : "transparent",
    borderColor: hovered && responseComplete ? "rgba(239, 35, 60, 0.4)" : "rgba(255, 255, 255, 0.12)",
    config: config.stiff,
  });

  return (
    <animated.button
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => handleSuggestionClick(text)}
      style={buttonAnim}
      type="button"
      disabled={!responseComplete}
      className="rounded-full border px-3 py-1 text-[0.8rem] text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
      {text}
    </animated.button>
  );
};
