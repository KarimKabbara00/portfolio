import React from "react";
import styles from "../css/.module.css";

interface propTypes {
  landingInView: boolean;
  setLandingInView: (inView: boolean) => void;
}

export const LandingSection: React.FC<propTypes> = ({ landingInView, setLandingInView }) => {
  return <div className="relative h-dvh w-dvw border-2 border-red-600 text-white">hello</div>;
};
