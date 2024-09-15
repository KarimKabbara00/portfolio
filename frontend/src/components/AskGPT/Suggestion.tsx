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
    backgroundColor: hovered && responseComplete ? "#ef233c" : "transparent",
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
      className="rounded-lg border-2 border-primary p-[0.15rem] px-2 text-[0.92rem] text-white disabled:cursor-not-allowed">
      {text}
    </animated.button>
  );
};
