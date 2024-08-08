import React, { useState } from "react";
import "../../index.css";
// import { useSpring, animated } from "@react-spring/web";
interface propTypes {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const ContactField: React.FC<propTypes> = ({ value, placeholder, onChange }) => {
  // const [focused, setFocused] = useState<boolean>(false);
  // const moveLabel = useSpring({
  //   transform: focused ? "translate(-14%, -205%)" : "translate(0%, -50%)",
  //   fontSize: focused ? "0.85rem" : "1rem",
  // });

  return (
    <div className="relative z-10 w-full rounded-sm bg-gradient-to-r from-primary via-primary to-secondary p-[0.1rem]">
      {/* <animated.label style={moveLabel} htmlFor={placeholder} className="pointer-events-none absolute inset-x-0 top-1/2 z-30 ml-3 w-fit transform">
        {placeholder}
      </animated.label> */}
      <input
        // onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false || value.length > 0)}
        placeholder={placeholder}
        name={placeholder}
        className="relative z-20 h-9 w-full rounded-sm bg-neutral-800 pl-2 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
