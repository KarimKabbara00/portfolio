import React from "react";

interface propType {
  tech: string;
  slash: boolean;
}

export const PortfolioTechnology: React.FC<propType> = ({ tech, slash }) => {
  return (
    <div className="mr-3 pt-[0.1rem] font-mono text-primary">
      {tech} {slash ? "|" : ""}
    </div>
  );
};
