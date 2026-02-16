import React, { useEffect } from "react";

interface ChatObject {
  text: string;
  fromGPT: boolean;
}

interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  setChatHistory: React.Dispatch<React.SetStateAction<ChatObject[]>>;
  submitPrompt: () => void;
}

export const TextArea: React.FC<Props> = ({ prompt, textAreaRef, setPrompt, setChatHistory, submitPrompt }) => {
  // text area resizing
  useEffect(() => {
    if (!textAreaRef.current) return;

    textAreaRef.current.style.height = "3rem"; // shrink to fit
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // set the height to the scroll height
    textAreaRef.current.style.overflowY = "hidden";

    // at a certain point, we want to scroll
    const currentPxHeight = parseInt(textAreaRef.current.style.height.split("px")[0]);
    if (currentPxHeight > 208) {
      textAreaRef.current.style.height = "208px";
      textAreaRef.current.style.overflowY = "auto";
    }
  }, [textAreaRef, prompt]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || !prompt) return;

    event.preventDefault();

    if (event.shiftKey) {
      setPrompt((prev) => prev + "\n");
      return;
    } else if (!event.shiftKey && prompt.replace(/\r?\n|\r/, "").length !== 0) {
      setChatHistory((prev) => {
        // update with user text
        return [...prev, { text: prompt, fromGPT: false }];
      });
      submitPrompt();
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      onKeyDown={handleKeyDown}
      onChange={(e) => setPrompt(e.target.value)}
      value={prompt}
      className="h-12 w-full resize-none bg-transparent py-3 pl-4 pr-12 text-[0.95rem] text-white placeholder-white/30 focus:outline-none"
      placeholder="Ask about Karim..."
    />
  );
};
