import React, { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface skillItemProps {
  text: string;
  imgLink: string;
  themeColor?: string;
  gradientColor?: string;
}

interface Blob {
  left: string;
  top: string;
}

export const SkillItem: React.FC<skillItemProps> = ({ text, imgLink, themeColor, gradientColor }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [blobPos, setBlobPos] = useState<Blob>({ left: "0px", top: "0px" });
  const ref = useRef<HTMLDivElement>(null);
  const lift = useSpring({
    scale: hovered ? "1.1" : "1",
    boxShadow: hovered ? "0px 0px 7px 10px rgba(0, 0, 0, 0.3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
  });

  const fadeBlob = useSpring({
    opacity: hovered ? 1 : 0,
    config: config.stiff,
  });

  const blob = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top > event.clientY || rect.bottom < event.clientY || rect.left > event.clientX || rect.right < event.clientX) {
      setHovered(false);
    } else {
      setHovered(true);
      const xPos = rect.left - event.clientX;
      const yPos = rect.top - event.clientY;
      setBlobPos({ left: `${-xPos}px`, top: `${-yPos}px` });
    }
  };

  const themeColorStyles = {
    ...blobPos,
    ...fadeBlob,
    backgroundColor: themeColor,
  };

  const gradientStyles = {
    ...blobPos,
    ...fadeBlob,
    background: gradientColor,
  };

  return (
    <animated.div
      style={lift}
      onMouseMove={blob}
      onMouseOut={() => setHovered(false)}
      className="relative h-32 w-36 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary to-secondary p-1 largeScreen:h-28 largeScreen:w-32 xsScreen:h-24 xsScreen:w-[6.5rem] xsScreen:min-w-[6.8rem]">
      <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-lg bg-bgColor xsScreen:gap-y-1">
        <img className="z-20 w-16 rounded-lg largeScreen:w-14 xsScreen:w-10" src={imgLink} alt={text} />
        <animated.div
          style={gradientColor ? gradientStyles : themeColorStyles}
          className="absolute left-1/2 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-2xl"></animated.div>{" "}
        <span className="z-10 text-center font-mono leading-4 text-white xsScreen:text-sm contactFieldWidthXs:text-xs">{text}</span>
      </div>
    </animated.div>
  );
};
