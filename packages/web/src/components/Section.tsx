import React from "react";

export function Section(props: { children: React.ReactNode }) {
  return <section className="section">{props.children}</section>;
}
