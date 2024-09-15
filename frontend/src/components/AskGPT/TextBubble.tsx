import React, { useEffect, useRef, useState } from "react";
import openAILogo from "../../assets/icons/other/openai-white-logomark.svg";
import { useSpring, animated, config } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text: string;
  fromGPT: boolean;
  setResponseComplete: React.Dispatch<React.SetStateAction<boolean>>;
  awaitingResponse: boolean;
  last: boolean;
}

export const TextBubble: React.FC<Props> = ({ text, fromGPT, setResponseComplete, awaitingResponse, last }) => {
  const containerStyle = {
    alignSelf: fromGPT ? "self-start" : "self-end",
  };

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
    from: { opacity: 0, transform: "scale(1.3)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 175,
    config: config.gentle,
  });

  return (
    <div style={containerStyle} className="relative flex w-fit gap-x-3 rounded-xl">
      {fromGPT && (
        <>
          <img className="mt-1 w-8 self-start contactFieldWidth:w-7 xxsScreen:w-6" src={openAILogo} alt="openAILogo"></img>
          <div className="mr-24 h-fit text-wrap break-words rounded-xl bg-transparent leading-7 contactFieldWidth:mr-14 portfolioTechWidth:mr-6 portfolioTechWidth:w-[82.5%] xxsScreen:mr-2">
            {shownText}
          </div>
          {awaitingResponse && last && <FontAwesomeIcon icon={faSpinner} className="fa-spin absolute left-11 top-2.5 self-center text-xl" />}
        </>
      )}
      {!fromGPT && (
        <animated.div className="h-fit text-wrap break-words rounded-xl bg-[#38383d] px-3 py-1.5 leading-7 xsScreen:text-[0.95rem]" style={animateBubble}>
          {shownText}
        </animated.div>
      )}
    </div>
  );
};
