import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Title } from "../shared/Title";
import { ContactField } from "./ContactField";
import { ContactTextArea } from "./ContactTextArea";

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

  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const hoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#ef233c" : "#1a1a1a",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div ref={targetRef} id="contact" className="relative h-screen w-screen text-white">
      <Title title="Contact" />
      <div className="ml-auto mr-auto mt-8 w-fit">Please reach out if you would like to work together.</div>
      <form onSubmit={sendMessage} className="relative ml-auto mr-auto mt-8 flex w-5/12 flex-col items-center gap-y-5">
        <ContactField placeholder="Your Name" value={name} onChange={setName} />
        <ContactField placeholder="Subject" value={subject} onChange={setSubject} />
        <ContactTextArea value={content} setValue={setContent} />
        <animated.button
          tabIndex={-1}
          onMouseOver={() => setButtonHovered(true)}
          onMouseOut={() => setButtonHovered(false)}
          type="submit"
          style={hoverAnim}
          className="h-12 w-40 self-start rounded-sm border-2 border-primary text-lg text-primary">
          <div>Send Message</div>
        </animated.button>
      </form>
    </div>
  );
};
