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
    <div ref={chatRef} className="z-20 flex w-full flex-grow flex-col gap-y-5 overflow-x-hidden overflow-y-auto bg-white/[0.02] px-5 py-5 [scrollbar-color:rgba(255,255,255,0.08)_transparent] [scrollbar-width:thin]">
      {chatHistory.map((item, index) => (
        <TextBubble key={index} last={index === chatHistory.length - 1} text={item.text} fromGPT={item.fromGPT} setResponseComplete={setResponseComplete} awaitingResponse={awaitingResponse} />
      ))}
    </div>
  );
};
