import React from "react";

interface skillItemProps {
  text: string;
  imgLink: string;
}

export const SkillItem: React.FC<skillItemProps> = ({ text, imgLink }) => {
  return (
    <div className="rounded-xl bg-gradient-to-r from-primary to-secondary p-1 xl:h-28 xl:w-32 2xl:h-36 2xl:w-40">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-xl bg-bgColor">
        <img className="rounded-xl xl:w-5/12 2xl:w-20" src={imgLink} />
        <span className="text-white">{text}</span>
      </div>
    </div>
  );
};
