import React from "react";

interface propType {
  tech: string;
  slash: boolean;
}

export const PortfolioTechnology: React.FC<propType> = ({ tech, slash }) => {
  const nbSpace = "\u00A0";
  return (
    <span className="font-mono text-primary xl:text-lg 2xl:text-2xl">
      {tech}
      {slash && nbSpace}
      {slash ? "|" + nbSpace : ""}
    </span>
  );
};
