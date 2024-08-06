import React from "react";

interface propTypes {
  contactInView: boolean;
  setContactInView: (inView: boolean) => void;
}

export const Contact: React.FC<propTypes> = ({ contactInView, setContactInView }) => {
  return <div className="relative h-screen w-screen border-red-600 text-white">hello</div>;
};
