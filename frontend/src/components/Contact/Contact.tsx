import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Title } from "../shared/Title";
import { ContactField } from "./ContactField";
import { ContactTextArea } from "./ContactTextArea";
import { Footer } from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faX, IconDefinition } from "@fortawesome/free-solid-svg-icons";
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
    backgroundColor: buttonHovered ? "#ef233c" : "#141516",
    color: buttonHovered ? "#E7ECEF" : "#ef233c",
    config: { tension: 600, friction: 30 },
  });

  const [icon, setIcon] = useState<IconDefinition>(faSpinner);
  const [iconStyle, setIconStyle] = useState<object>({
    color: "#E7ECEF",
    marginLeft: "0.75rem",
    marginRight: "0.5rem",
    fontSize: "1.5rem",
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
      setIconStyle((prev) => {
        return { ...prev, color: "#E7ECEF" };
      });
      setIcon(faSpinner);

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

      if (response.ok === true) {
        setMessageSent(false);
        setResponseReceived(true);
        setIconStyle((prev) => {
          return { ...prev, color: "#16a34a" };
        });
        setIcon(faCheck);
      } else {
        setMessageSent(false);
        setMessageError(true);
        setIconStyle((prev) => {
          return { ...prev, color: "#dc2626" };
        });
        setIcon(faX);
      }
    } catch (e) {
      setMessageSent(false);
      setMessageError(true);
      setIconStyle((prev) => {
        return { ...prev, color: "#dc2626" };
      });
      setIcon(faX);
    }
  }

  return (
    <div ref={targetRef} id="contact" className="z-1 relative flex min-h-dvh w-screen flex-col items-center pb-72 text-white">
      <Title title="Contact" />
      <div className="smallScreen:mt-12 contactFieldWidthXs:w-[22rem] xxsScreen:w-72 contactFieldWidthXs:text-sm smallScreen:w-[29rem] mt-16 w-fit text-center text-base">
        If you're interested in collaborating, feel free to contact me. I'm open to discussing any opportunities.
      </div>
      <form
        onSubmit={sendMessage}
        className="midScreen:w-[50rem] contactFieldWidth:w-[30rem] xxsScreen:w-[20rem] contactFieldWidthXs:w-[22.5rem] smallScreen:w-[40rem] relative mt-8 flex w-[55rem] flex-col items-center gap-y-5">
        <ContactField placeholder="Name" value={name} onChange={setName} />
        <ContactField placeholder="Subject" value={subject} onChange={setSubject} />
        <ContactTextArea value={content} onChange={setContent} />
        <div className="contactFieldWidth:flex-col flex items-center self-start">
          <div className="flex items-center self-start">
            <animated.button
              tabIndex={-1}
              onMouseOver={() => setButtonHovered(true)}
              onMouseOut={() => setButtonHovered(false)}
              type="submit"
              style={hoverAnim}
              className="smallScreen:text-base xsScreen:text-sm xlScreen:px-6 xlScreen:py-3 largeScreen:text-lg largeScreen:px-4 largeScreen:py-2 xlScreen:text-xl self-start rounded-sm border-2 border-primary text-lg text-primary">
              <div>Send Message</div>
            </animated.button>
            {(messageSent || responseReceived || messageError) && <FontAwesomeIcon style={iconStyle} className={icon === faSpinner ? "fa-spin" : ""} icon={icon} />}
          </div>
          {responseReceived && <div className="contactFieldWidth:pt-4 text-[0.9rem]">Thanks for contacting me. I’ll get back to you soon!</div>}
          {messageError && <div className="contactFieldWidth:pt-4 text-[0.9rem]">Error sending message. Please email me directly.</div>}
        </div>
      </form>
      <Footer />
    </div>
  );
};
