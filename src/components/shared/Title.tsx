import React from "react";
import styles from "../css/.module.css";

interface propType {
  title: string;
}

export const Title: React.FC<propType> = ({ title }) => {
  return (
    <div className="flex h-32 flex-col items-center justify-center pt-8">
      <div>
        <div className="pb-1 text-white xl:text-5xl 2xl:text-6xl">{title}</div>
        <div className="h-1 w-full bg-primary pb-1 text-6xl text-white"></div>
      </div>
    </div>
  );
};
