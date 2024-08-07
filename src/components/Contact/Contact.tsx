import React, { useEffect, useRef } from "react";
import { Title } from "../shared/Title";

interface propTypes {
  contactInView: boolean;
  setContactInView: (inView: boolean) => void;
}

export const Contact: React.FC<propTypes> = ({ contactInView, setContactInView }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // show flag for hovering over portfolio images
  useEffect(() => {
    const checkInView = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const inView = rect.top <= 75 && rect.left >= 0 && rect.bottom >= windowHeight - 20 && rect.right <= windowWidth;
        setContactInView(inView);
      }
    };
    document.addEventListener("scroll", checkInView);
    checkInView(); // check on start up in case we land on portfolio directly
    return () => document.removeEventListener("scroll", checkInView);
  }, [setContactInView]);

  return (
    <div ref={targetRef} id="contact" className="relative h-screen w-screen border-red-600 text-white">
      <Title title="Contact" />
    </div>
  );
};
