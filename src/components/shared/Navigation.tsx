import React from "react";
import styles from "../css/.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faEnvelope, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

interface propTypes {
  landingInView: boolean;
  aboutInView: boolean;
  portfolioInView: boolean;
  contactInView: boolean;
}

export const Navigation: React.FC<propTypes> = ({ landingInView, aboutInView, portfolioInView, contactInView }) => {
  function test() {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div onClick={test} className="z-100 fixed bottom-6 ml-5 flex w-12 flex-col items-center gap-y-8 text-white">
      <div>
        <FontAwesomeIcon icon={faHome} className="text-2xl" style={{ color: landingInView ? "#ef233c" : "white" }} />
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} className="text-2xl" style={{ color: aboutInView ? "#ef233c" : "white" }} />
      </div>
      <div>
        <FontAwesomeIcon icon={faBriefcase} className="text-2xl" style={{ color: portfolioInView ? "#ef233c" : "white" }} />
      </div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} className="text-2xl" style={{ color: contactInView ? "#ef233c" : "white" }} />
      </div>
    </div>
  );
};
