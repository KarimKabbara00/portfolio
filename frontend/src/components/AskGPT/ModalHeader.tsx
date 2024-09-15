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
    <div className="relative w-full rounded-t-lg border-b-thin border-stone-400 bg-[#101112]">
      <h1 className="ml-4 mt-3 h-fit text-3xl portfolioTechWidth:text-2xl xxsScreen:text-xl">Learn More with ChatGPT</h1>

      <FontAwesomeIcon onClick={() => setShowGPTModal(false)} className="absolute right-2 top-2 transform cursor-pointer transition-colors hover:text-primary" icon={faX} />
      <animated.button
        onMouseOver={() => setRefreshHovered(true)}
        onMouseOut={() => setRefreshHovered(false)}
        onClick={handleClick}
        style={spinAnim}
        type="button"
        className="absolute bottom-1 right-1.5 z-20">
        <FontAwesomeIcon icon={faArrowsSpin} className="text-lg" />
      </animated.button>
      <div className="flex items-center gap-x-2 py-2 pl-3 xsScreen:py-2">
        <SuggestionsParent isSpinning={isSpinning} setPrompt={setPrompt} prompt={prompt} handleSubmit={handleSubmit} currentSuggestions={currentSuggestions} responseComplete={responseComplete} />
      </div>
    </div>
  );
};
