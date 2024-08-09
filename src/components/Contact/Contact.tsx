import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Title } from "../shared/Title";
import { ContactField } from "./ContactField";
import { ContactTextArea } from "./ContactTextArea";
import { Footer } from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
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

  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formUrl = "https://formspree.io/f/mwpebora";
    try {
      setMessageSent(true);
      setResponseReceived(false);
      setMessageError(false);
      const response = await fetch(formUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Your Name": name,
          Subject: subject,
          message: content,
        }),
      });
      console.log(response);
      if (response.ok === true) {
        setMessageSent(false);
        setResponseReceived(true);
      } else {
        setMessageSent(false);
        setMessageError(true);
      }
    } catch (e) {
      setMessageSent(false);
      setMessageError(true);
      console.log(e);
    }
  }

  return (
    <div ref={targetRef} id="contact" className="relative h-screen w-screen text-white">
      <Title title="Contact" />
      <div className="ml-auto mr-auto mt-8 w-fit">If you're interested in collaborating, feel free to contact me. I'm open to discussing any opportunities.</div>
      <form onSubmit={sendMessage} className="relative ml-auto mr-auto mt-8 flex w-5/12 flex-col items-center gap-y-5">
        <ContactField placeholder="Name" value={name} onChange={setName} />
        <ContactField placeholder="Subject" value={subject} onChange={setSubject} />
        <ContactTextArea value={content} onChange={setContent} />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <animated.button
              tabIndex={-1}
              onMouseOver={() => setButtonHovered(true)}
              onMouseOut={() => setButtonHovered(false)}
              type="submit"
              style={hoverAnim}
              className="h-12 w-40 self-start rounded-sm border-2 border-primary text-lg text-primary">
              <div>Send Message</div>
            </animated.button>
            {messageSent && !responseReceived && <FontAwesomeIcon className="fa-spin ml-4 text-2xl" icon={faSpinner} />}
            {responseReceived && (
              <div className="ml-3 flex items-center gap-x-2">
                <FontAwesomeIcon className="text-2xl text-green-600" icon={faCheck} />
                <span className="text-[0.9rem]">Thanks for contacting me. I’ll get back to you soon!</span>
              </div>
            )}
            {messageError && (
              <div className="ml-3 flex items-center gap-x-2">
                <FontAwesomeIcon className="text-2xl text-red-600" icon={faX} />
                <span className="text-[0.9rem]">Error sending message. Please email me directly.</span>
              </div>
            )}
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};
