import { useSpring, animated, config } from "@react-spring/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Chat } from "./Chat";
// import { askGPT } from "../../helperFunctions";
import { SendButton } from "./SendButton";
import { TextArea } from "./TextArea";
import { ModalHeader } from "./ModalHeader";
import axios from "axios";

interface Props {
  showGPTModal: boolean;
  setShowGPTModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChatObject {
  text: string;
  fromGPT: boolean;
}

export const GPTModal: React.FC<Props> = ({ showGPTModal, setShowGPTModal }) => {
  const backdropSpring = useSpring({
    opacity: showGPTModal ? 1 : 0,
    pointerEvents: showGPTModal ? "auto" : ("none" as "auto" | "none"),
    config: { tension: 280, friction: 24 },
  });

  const modalSpring = useSpring({
    opacity: showGPTModal ? 1 : 0,
    transform: showGPTModal ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.97)",
    pointerEvents: showGPTModal ? "auto" : ("none" as "auto" | "none"),
    config: { tension: 280, friction: 24 },
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatObject[]>([]);
  const [firstOpenGPT, setFirstOpenGPT] = useState<boolean>(true); // first message
  const [responseComplete, setResponseComplete] = useState<boolean>(false); // control send button & autoscroll interval
  const [interacted, setInteracted] = useState<boolean>(false); // stop auto scroll if user scrolls
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  useEffect(() => {
    if (firstOpenGPT && showGPTModal) {
      setChatHistory([
        {
          text: "Hello! I'm here to help you learn more about Karim's professional and project experience. Feel free to ask me a question or use one of the templates provided above.",
          fromGPT: true,
        },
      ]);
      setFirstOpenGPT(false);
    }

    if (!showGPTModal) textAreaRef.current?.blur();
  }, [showGPTModal, firstOpenGPT]);

  const submitPrompt = useCallback(async () => {
    if (!prompt || !textAreaRef.current) return;

    // clear text area
    setPrompt("");

    setTimeout(() => {
      // need a time out to allow for the user bubble to add. Thens scroll.
      if (!chatRef.current) return;
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, 100);

    setChatHistory((prev) => {
      return [...prev, { text: "", fromGPT: true }];
    });

    setResponseComplete(false); // disabled button
    setInteracted(false); // re activate auto scroll
    setAwaitingResponse(true); // loading anim

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/ask-gpt`, {
        prompt,
      })
      .then((res) => {
        setChatHistory((prev) => {
          const updatedHistory = prev.slice();
          updatedHistory.pop();
          return [...updatedHistory, { text: res.data, fromGPT: true }];
        });
        setAwaitingResponse(false);
      })
      .catch((err) => {
        setResponseComplete(true);
        setAwaitingResponse(false);
        setChatHistory((prev) => {
          const updatedHistory = prev.slice();
          updatedHistory.pop();
          return [...updatedHistory, { text: err.data, fromGPT: true }];
        });
      });
  }, [prompt]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!prompt) return;

      setChatHistory((prev) => {
        // update with user text
        return [...prev, { text: prompt, fromGPT: false }];
      });
      submitPrompt();
    },
    [prompt, submitPrompt],
  );

  return (
    <>
      {showGPTModal && <animated.div style={backdropSpring} id="chatGPTBlur" className="fixed z-[60] h-full w-full backdrop-blur-md"></animated.div>}
      <animated.div
        style={modalSpring}
        className="fixed left-1/2 top-1/2 z-[70] flex h-[90%] w-[51rem] flex-col items-center rounded-2xl border border-white/10 bg-[#101112] text-white shadow-2xl shadow-black/50 xsScreen:w-[40rem] contactFieldWidth:w-[30rem] portfolioTechWidth:w-[23rem] xxsScreen:w-[20rem]">
        <ModalHeader setShowGPTModal={setShowGPTModal} handleSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} responseComplete={responseComplete} />
        <Chat
          chatHistory={chatHistory}
          chatRef={chatRef}
          responseComplete={responseComplete}
          setResponseComplete={setResponseComplete}
          interacted={interacted}
          setInteracted={setInteracted}
          awaitingResponse={awaitingResponse}
        />
        <form
          className="relative z-30 mx-3 mb-3 mt-2 flex w-[calc(100%-1.5rem)] items-end rounded-2xl border border-white/10 bg-[#1a1a1e] transition-colors focus-within:border-white/20 portfolioTechWidth:mx-2 portfolioTechWidth:w-[calc(100%-1rem)]"
          onSubmit={handleSubmit}
        >
          <TextArea textAreaRef={textAreaRef} prompt={prompt} setChatHistory={setChatHistory} setPrompt={setPrompt} submitPrompt={submitPrompt} />
          <SendButton responseComplete={responseComplete} prompt={prompt} />
        </form>
      </animated.div>
    </>
  );
};
