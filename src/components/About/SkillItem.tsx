import React from "react";

interface skillItemProps {
  text: string;
  imgLink: string;
}

export const SkillItem: React.FC<skillItemProps> = ({ text, imgLink }) => {
  return (
    <div className="from-primary to-secondary h-36 w-40 rounded-xl bg-gradient-to-br p-1">
      <div className="bg-bgColor flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-xl">
        <img className="rounded-xl" src={imgLink} width="80px" />
        <span className="text-white">{text}</span>
      </div>
    </div>
  );
};
