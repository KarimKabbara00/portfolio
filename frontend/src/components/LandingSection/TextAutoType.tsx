import React, { useEffect, useState, useMemo } from "react";

export const TextAutoType = () => {
  const options: string[] = useMemo(() => {
    return ["Software Engineer.", "Classical Music Enthusiast.", "Problem Solver."];
    // return ["Classical Music Enthusiast.", "Classical Music Enthusiast.", "Classical Music Enthusiast."];
  }, []);

  const [wordIndex, setWordIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const [showBar, setShowBar] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      if (letterIndex > options[wordIndex].length - 1) {
        setShowBar((prev) => !prev);
      } else {
        setShowBar(true);
      }
    }, 500);
  }, [letterIndex, options, wordIndex, showBar]);

  useEffect(() => {
    if (letterIndex > options[wordIndex].length - 1 && direction === 1) {
      setTimeout(() => setDirection(-1), 3500);
      return;
    }
    if (letterIndex < 0) {
      setTimeout(() => {
        setDirection(1);
      }, 50);
      setLetterIndex(0);
      setWordIndex((prev) => {
        if (prev + 1 > options.length - 1) return 0;
        return prev + 1;
      });
      return;
    }

    const timeout = setTimeout(() => {
      setLetterIndex((prev) => {
        if (prev >= options[wordIndex].length && direction === 1) return prev;
        return prev + 1 * direction;
      });
    }, 40);

    return () => clearTimeout(timeout);
  }, [letterIndex, direction, options, wordIndex]);

  return (
    <div className="relative w-full text-center">
      I am a&nbsp;
      <span className="relative">
        {options[wordIndex].slice(0, letterIndex)}
        {showBar && <div className="absolute -right-[1.25%] top-[9%] h-[75%] border-[0.11rem] border-primary"></div>}
      </span>
    </div>
  );
};
