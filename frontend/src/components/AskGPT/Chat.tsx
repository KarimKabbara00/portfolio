import React, { useEffect, useRef } from "react";
import { TextBubble } from "./TextBubble";

interface ChatObject {
  text: string;
  fromGPT: boolean;
}

interface Props {
  chatHistory: ChatObject[];
  chatRef: React.RefObject<HTMLDivElement>;
  responseComplete: boolean;
  setResponseComplete: React.Dispatch<React.SetStateAction<boolean>>;
  interacted: boolean;
  setInteracted: React.Dispatch<React.SetStateAction<boolean>>;
  awaitingResponse: boolean;
}

export const Chat: React.FC<Props> = ({ chatHistory, chatRef, responseComplete, setResponseComplete, interacted, setInteracted, awaitingResponse }) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const startup = useRef<boolean>(true);

  useEffect(() => {
    const element = chatRef.current;
    const handleScroll = () => {
      setInteracted(true);
    };
    element?.addEventListener("wheel", handleScroll);
    element?.addEventListener("touchmove", handleScroll);

    return () => {
      element?.removeEventListener("wheel", handleScroll);
      element?.removeEventListener("touchmove", handleScroll);
    };
  }, [chatRef, setInteracted]);

  useEffect(() => {
    if (!chatRef.current) return;
    if (startup.current) {
      startup.current = false;
      return;
    }
    if (!responseComplete && !interacted) {
      intervalRef.current = setInterval(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    } else if (responseComplete || interacted) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [chatRef, interacted, responseComplete]);

  return (
    <div ref={chatRef} className="z-20 flex overflow-x-hidden w-full flex-grow flex-col gap-y-6 overflow-y-auto border-b-thin border-stone-500 bg-[#191c1d] px-4 py-6">
      {chatHistory.map((item, index) => (
        <TextBubble key={index} last={index === chatHistory.length - 1} text={item.text} fromGPT={item.fromGPT} setResponseComplete={setResponseComplete} awaitingResponse={awaitingResponse} />
      ))}
    </div>
  );
};
