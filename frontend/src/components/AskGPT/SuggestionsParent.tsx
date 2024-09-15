import React, { useEffect, useRef } from "react";
import { Suggestion } from "./Suggestion";
import { useSpring, animated } from "@react-spring/web";

interface Props {
  isSpinning: boolean;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  currentSuggestions: string[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  responseComplete: boolean;
}

export const SuggestionsParent: React.FC<Props> = ({ isSpinning, setPrompt, prompt, currentSuggestions, handleSubmit, responseComplete }) => {
  // ---- handle the suggestion submit ---- //
  const submitRef = useRef(false);
  const handleSuggestionClick = (p: string) => {
    setPrompt(p); // force the prompt
    submitRef.current = true; // set a flag to trigger use effect
  };
  useEffect(() => {
    if (submitRef.current && prompt) {
      // when the flag is set and the prompt is forced
      const syntheticEvent = new Event("submit", {
        // create a fake event and submit
        bubbles: true,
        cancelable: true,
      });
      handleSubmit(syntheticEvent as unknown as React.FormEvent<HTMLFormElement>);
      submitRef.current = false; // unset the flag
    }
  }, [handleSubmit, prompt]);

  // ---- handle the suggestion submit ---- //

  const slideSuggestions = useSpring({
    transform: isSpinning ? "translateY(175%)" : "translateY(0%)",
  });

  return (
    <animated.div style={slideSuggestions} className="flex w-full z-10 items-end gap-2 xsScreen:flex-wrap xsScreen:gap-1.5">
      {currentSuggestions.map((suggestion, index) => (
        <Suggestion key={index} text={suggestion} handleSuggestionClick={handleSuggestionClick} responseComplete={responseComplete} />
      ))}
    </animated.div>
  );
};
