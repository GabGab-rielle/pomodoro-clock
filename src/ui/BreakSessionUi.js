import React from "react";

//  create a component for the container in Break and Session files
export const BreakSessionContainer = ({ children, ...props }) => {
  return (
    <div className="flex flex-col items-center" {...props}>
      {children}
    </div>
  );
};

export const BreakSessionLabel = ({ children, ...props }) => {
  return (
    <p className="text-lg font-medium font-mono text-gray-300" {...props}>
      {children}
    </p>
  );
};

export const BreakSessionTime = ({ children, ...props }) => {
  return (
    <p className="text-4xl font-clock font-bold text-gray-300" {...props}>
      {children}
    </p>
  );
};

export const PlusMinusButton = ({ children, ...props }) => {
  return (
    <button
      className="text-m text-gray-800 px-4 py-1 bg-indigo-300 rounded-full hover:bg-yellow-400"
      {...props}
    >
      {children}
    </button>
  );
};

export const PlusMinusTimeContainer = ({ children, ...props }) => {
  return (
    <div className="grid grid-flow-col gap-4 rounded items-center" {...props}>
      {children}
    </div>
  );
};
