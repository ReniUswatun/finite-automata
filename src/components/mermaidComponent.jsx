"use client";
import mermaid from "mermaid";

import React from "react";
export default function MermaidComponent({ code }) {
  React.useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return (
    <>
      <div className="mermaid">{code}</div>
    </>
  );
}
