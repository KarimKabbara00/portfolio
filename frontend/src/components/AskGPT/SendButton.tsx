import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import sendSVG from "../../assets/icons/other/send.svg";

interface Props {
  responseComplete: boolean;
  prompt: string;
}

export const SendButton: React.FC<Props> = ({ responseComplete, prompt }) => {
  const [sendHovered, setSendHovered] = useState<boolean>(false);
  const hasText = prompt.trim().length > 0;

  const anim = useSpring({
    backgroundColor: hasText && responseComplete ? "#ef233c" : "rgba(255, 255, 255, 0.06)",
    transform: sendHovered && hasText && responseComplete ? "scale(1.1)" : "scale(1)",
    config: config.stiff,
  });

  const iconAnimation = useSpring({
    from: { transform: "translateY(2px)" },
    to: [{ transform: "translateY(-3px)" }, { transform: "translateY(2px)" }],
    loop: sendHovered && hasText && responseComplete,
    config: { duration: 400 },
  });

  return (
    <animated.button
      onMouseOver={() => setSendHovered(true)}
      onMouseOut={() => setSendHovered(false)}
      style={anim}
      disabled={!responseComplete}
      className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      type="submit"
    >
      <animated.img
        className="h-4 w-4"
        alt="sendPromptToGPT"
        style={sendHovered && hasText && responseComplete ? iconAnimation : {}}
        src={sendSVG}
      />
    </animated.button>
  );
};
