import { faCircle, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Info = () => {
  return (
    <div className="absolute top-0 flex h-40 w-full flex-col">
      <div className="item xlScreen:text-sm smallScreen:text-xs relative ml-5 flex w-fit gap-x-3 p-4 pb-0 pl-0 font-mono">
        <div className="relative">
          <FontAwesomeIcon icon={faCircle} className="mt-1.5 text-[0.8rem] text-green-500" />
          <FontAwesomeIcon icon={faCircle} className="absolute left-0 mt-1.5 animate-ping text-[0.8rem] text-green-500" />
        </div>
        <div>
          Software Engineer at
          <br /> Geotech Environmental Equipment, Inc.
        </div>
      </div>

      <div className="xlScreen:text-sm smallScreen:text-xs relative ml-5 flex smallScreen:items-center w-fit gap-x-3 p-4 pb-0 pl-0 font-mono">
        <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 text-[1.1rem] text-red-500" />
        <div>Based in Englewood, Colorado.</div>
      </div>
    </div>
  );
};
