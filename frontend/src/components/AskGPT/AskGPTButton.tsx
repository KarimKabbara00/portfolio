import React, { useState } from "react";
import aiLogo from "../../assets/icons/other/sparkles.svg";
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
      className="fixed right-4 top-3 z-[55] w-8 cursor-pointer text-white smallScreen:top-[14px] smallScreen:w-7 xxsScreen:top-4 xxsScreen:w-6"
      alt="askAI"
      src={aiLogo}
    />
  );
};
