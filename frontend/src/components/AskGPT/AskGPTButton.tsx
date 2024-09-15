import React, { useState } from "react";
import openAILogo from "../../assets/icons/other/openai-white-logomark.svg";
import { useSpring, animated, config } from "@react-spring/web";

interface Props {
  setShowGPTModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AskGPTButton: React.FC<Props> = ({ setShowGPTModal }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const scale = useSpring({
    transform: hovered ? "scale(1.2)" : "scale(1)",
    config: config.stiff,
  });

  return (
    <animated.img
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => setShowGPTModal(true)}
      style={scale}
      className="fixed right-0 top-0 z-50 m-4 w-8 smallScreen:w-7 xxsScreen:w-6 cursor-pointer text-white"
      alt="askGPT"
      src={openAILogo}
    />
  );
};
