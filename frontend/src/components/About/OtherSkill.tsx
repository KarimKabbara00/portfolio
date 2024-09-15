import { config, useSpring, animated } from "@react-spring/web";
import React, { useState, useMemo } from "react";
import transcript from "../../assets/Karim_Kabbara_Transcript.pdf";
import ccna from "../../assets/Karim_Kabbara_CCNA.pdf";
import secPlus from "../../assets/Karim_Kabbara_SecPlus.pdf";

interface propTypes {
  icon: string;
  alt: string;
  name: string | React.ReactNode;
  size?: string;
  animate?: boolean;
}

export const OtherSkill: React.FC<propTypes> = ({ icon, alt, name, animate = false, size = "h-10" }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  // Use useMemo to map alt to file
  const file = useMemo(() => {
    const fileMap: { [key: string]: string } = {
      "B.S. in Computer Science": transcript,
      "CCNA (200-301)": ccna,
      "Security+ (SY0-601)": secPlus,
    };
    return fileMap[alt] || "";
  }, [alt]);

  const scaleAnim = useSpring({
    transform: hovered ? "scale(1.1)" : "scale(1)",
    config: config.stiff,
  });

  const openResource = () => {
    if (file) {
      window.open(file, "_blank", "noopener,noreferrer");
    } else alert("Resource not available.");
  };

  return (
    <animated.div
      className="flex w-24 flex-col items-center gap-y-1"
      style={animate ? { ...scaleAnim, cursor: "pointer" } : {}}
      onClick={openResource}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      role="button"
      aria-label={alt}>
      <img className={size} src={icon} alt={alt} />
      <span className="text-center font-mono text-sm text-white largeScreen:text-xs midScreen:text-sm">{name}</span>
    </animated.div>
  );
};
