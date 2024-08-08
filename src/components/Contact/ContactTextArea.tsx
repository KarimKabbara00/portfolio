import React, { useState } from "react";
// import { useSpring, animated } from "@react-spring/web";

interface propTypes {
  value: string;
  setValue: (value: string) => void;
}

export const ContactTextArea: React.FC<propTypes> = ({ value, setValue }) => {
  //   const [focused, setFocused] = useState<boolean>(false);
  //   const moveLabel = useSpring({
  //     transform: focused ? "translate(-10%, -125%)" : "translate(-2%, 40%)",
  //     fontSize: focused ? "0.85rem" : "1rem",
  //   });

  return (
    <div className="relative h-48 w-full rounded-sm bg-gradient-to-r from-primary via-primary to-secondary p-[0.1rem]">
      {/* <animated.label style={moveLabel} htmlFor="textArea" className="pointer-events-none absolute inset-x-0 top-0 z-30 ml-3 w-fit transform">
        Your Message
      </animated.label> */}
      {/* <textarea onFocus={() => setFocused(true)} onBlur={() => setFocused(false || value.length > 0)} className="min-h-full w-full resize-none rounded-lg bg-neutral-800 p-1" /> */}
      <textarea placeholder="Your message" className="min-h-full w-full resize-none rounded-sm bg-neutral-800 pl-2 pt-1.5 focus:border-0 focus:outline-none" />
    </div>
  );
};
