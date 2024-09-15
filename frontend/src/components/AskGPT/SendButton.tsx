import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import sendSVG from "../../assets/icons/other/send.svg";

interface Props {
  responseComplete: boolean;
}

export const SendButton: React.FC<Props> = ({ responseComplete }) => {
  const [sendHovered, setSendHovered] = useState<boolean>(false);
  const anim = useSpring({
    transform: sendHovered && responseComplete ? "scale(1.05)" : "scale(0.95)",
    backgroundColor: sendHovered && responseComplete ? "#ef233c " : "#171717",
    borderColor: sendHovered ? "#ef233c" : "#57534e",
    config: config.stiff,
  });

  const iconAnimation = useSpring({
    from: { transform: "translateY(5%) scale(1.15)" },
    to: [{ transform: "translateY(-10%) scale(1.15)" }, { transform: "translateY(5%) scale(1.15)" }],
    loop: true,
    config: { duration: 450 },
  });

  return (
    <animated.button
      onMouseOver={() => setSendHovered(true)}
      onMouseOut={() => setSendHovered(false)}
      style={anim}
      disabled={!responseComplete}
      className="h-12 min-w-12 self-end rounded-full border-2 disabled:cursor-not-allowed"
      type="submit">
      <animated.img className="z-[100] h-6 w-12" alt="sendPromptToGPT" style={sendHovered && responseComplete ? iconAnimation : {}} src={sendSVG} />
    </animated.button>
  );
};
