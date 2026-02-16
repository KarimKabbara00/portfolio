import { faArrowsSpin, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { SuggestionsParent } from "./SuggestionsParent";

interface Props {
  setShowGPTModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  responseComplete: boolean;
}

export const ModalHeader: React.FC<Props> = ({ setShowGPTModal, setPrompt, prompt, handleSubmit, responseComplete }) => {
  // Handle the spinning logic using spring
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [refreshHovered, setRefreshHovered] = useState<boolean>(false);
  const spinAnim = useSpring({
    transform: isSpinning ? "rotate(360deg)" : "rotate(0deg)",
    color: refreshHovered ? "#ef233c" : "white",
    config: { tension: 170, friction: 25 },
    onRest: () => setIsSpinning(false),
  });

  // suggested prompts
  const allSuggestions = [
    "Summarize Karim's skills.",
    "How does Karim use Agile?",
    "Describe Karim's experience.",
    "What motivates Karim at work?",
    "Which languages has Karim used?",
    "What frameworks does Karim use?",
    "What are Karim's key strengths?",
    "How does Karim manage projects?",
    "What did Karim build at Geotech?",
    "How does Karim handle deadlines?",
    "How does Karim boost efficiency?",
    "Describe a project Karim worked on.",
    "What's Karim's problem-solving style?",
  ];

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(["Summarize Karim's skills", "Describe Karim’s experience"]);

  const handleClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const suggestions: string[] = [];
    while (suggestions.length !== 2) {
      const randomSuggestion = allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
      if (suggestions.includes(randomSuggestion) || currentSuggestions.includes(randomSuggestion)) continue;
      suggestions.push(randomSuggestion);
    }
    setTimeout(() => setCurrentSuggestions(suggestions), 500);
  };

  return (
    <div className="relative w-full rounded-t-2xl border-b border-white/[0.06] bg-transparent">
      <h1 className="ml-4 mt-3 h-fit text-lg font-medium tracking-wide text-white/80 portfolioTechWidth:text-base xxsScreen:text-sm">Ask about Karim</h1>

      <button
        onClick={() => setShowGPTModal(false)}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/10 hover:text-white/80"
        type="button"
      >
        <FontAwesomeIcon icon={faX} className="text-xs" />
      </button>
      <animated.button
        onMouseOver={() => setRefreshHovered(true)}
        onMouseOut={() => setRefreshHovered(false)}
        onClick={handleClick}
        style={spinAnim}
        type="button"
        className="absolute bottom-2 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-white/10">
        <FontAwesomeIcon icon={faArrowsSpin} className="text-sm" />
      </animated.button>
      <div className="flex items-center gap-x-2 overflow-hidden py-2 pl-4 pr-10 xsScreen:py-2">
        <SuggestionsParent isSpinning={isSpinning} setPrompt={setPrompt} prompt={prompt} handleSubmit={handleSubmit} currentSuggestions={currentSuggestions} responseComplete={responseComplete} />
      </div>
    </div>
  );
};
