import React, { useEffect, useRef, useState } from "react";

import { useSpring, animated } from "@react-spring/web";

interface Props {
  text: string;
  fromGPT: boolean;
  setResponseComplete: React.Dispatch<React.SetStateAction<boolean>>;
  awaitingResponse: boolean;
  last: boolean;
}

export const TextBubble: React.FC<Props> = ({ text, fromGPT, setResponseComplete, awaitingResponse, last }) => {
  // ----------- GPT letter type thing. ----------- //
  const [shownText, setShownText] = useState<string>(fromGPT ? "" : text);
  const currentTextRef = useRef("");
  useEffect(() => {
    if (!fromGPT) return;

    let index = 0;
    currentTextRef.current = "";

    const interval = setInterval(() => {
      if (index < text.length) {
        currentTextRef.current += text[index];
        setShownText(currentTextRef.current);
        index++;
      } else {
        clearInterval(interval);
      }
      if (index === text.length && text.length !== 0) setResponseComplete(true);
    }, 8);

    return () => clearInterval(interval);
  }, [fromGPT, text, setResponseComplete]);
  // ----------- GPT letter type thing. ----------- //

  const animateBubble = useSpring({
    from: { opacity: 0, transform: "translateY(8px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 100,
    config: { tension: 280, friction: 22 },
  });

  return (
    <animated.div style={animateBubble} className={`relative flex w-full ${fromGPT ? "" : "justify-end"}`}>
      {fromGPT && (
        <div className="mr-16 h-fit text-wrap break-words text-[0.95rem] leading-7 text-white/90 contactFieldWidth:mr-8 portfolioTechWidth:mr-4 xxsScreen:mr-2">
          {shownText}
          {awaitingResponse && last && (
            <span className="ml-1 inline-flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0ms]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
            </span>
          )}
        </div>
      )}
      {!fromGPT && (
        <div className="h-fit max-w-[80%] text-wrap break-words rounded-2xl rounded-br-sm bg-white/[0.08] px-4 py-2 text-[0.95rem] leading-7">
          {shownText}
        </div>
      )}
    </animated.div>
  );
};
