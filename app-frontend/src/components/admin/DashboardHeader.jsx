import React from "react";

function DashboardHeader({ heading, text, children }) {
  return (
    <div className="flex items-center justify-between px-2 mb-8">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg font-normal">{text}</p>}
      </div>
      {children}
    </div>
  );
}
export default DashboardHeader;
