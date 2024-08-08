import React from "react";

interface skillItemProps {
  text: string;
  imgLink: string;
}

export const SkillItem: React.FC<skillItemProps> = ({ text, imgLink }) => {
  return (
    <div className="rounded-sm bg-gradient-to-r from-primary via-primary to-secondary p-1 xl:h-28 xl:w-32 2xl:h-36 2xl:w-40">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-sm bg-bgColor">
        <img className="rounded-sm xl:w-5/12 2xl:w-20" src={imgLink} alt={text} />
        <span className="font-mono text-white">{text}</span>
      </div>
    </div>
  );
};
