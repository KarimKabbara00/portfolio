import React from "react";

interface propType {
  title: string;
}

export const Title: React.FC<propType> = ({ title }) => {
  return (
    <div className="flex h-32 flex-col items-center justify-center midScreen:pt-12 pt-7">
      <div>
        <div className="largeScreen:text-5xl pb-1 text-6xl text-white">{title}</div>
        <div className="h-1 w-full bg-primary pb-1 text-6xl text-white"></div>
      </div>
    </div>
  );
};
