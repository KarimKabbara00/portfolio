import React from "react";

interface propType {
  tech: string;
  slash: boolean;
}

export const PortfolioTechnology: React.FC<propType> = ({ tech, slash }) => {
  const nbSpace = "\u00A0";
  return (
    <span className="xsScreen:text-lg midScreen:text-xl largeScreen:text-xl font-mono text-2xl text-primary">
      {tech}
      {slash ? " |" + nbSpace : ""}
    </span>
  );
};
