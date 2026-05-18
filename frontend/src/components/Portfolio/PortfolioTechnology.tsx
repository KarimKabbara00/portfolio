import React from "react";

interface propType {
  tech: string;
}

export const PortfolioTechnology: React.FC<propType> = ({ tech }) => {
  return (
    <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-sm text-primary ring-1 ring-primary/30">
      {tech}
    </span>
  );
};
