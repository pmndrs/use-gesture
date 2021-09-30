import React from 'react';
export function SourceIcon(props) {
  switch (props.type) {
    case 'lvl1':
      return React.createElement(LvlIcon, null);

    case 'content':
      return React.createElement(ContentIcon, null);

    default:
      return React.createElement(AnchorIcon, null);
  }
}

function LvlIcon() {
  return React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, React.createElement("path", {
    d: "M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  }));
}

function AnchorIcon() {
  return React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, React.createElement("path", {
    d: "M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

function ContentIcon() {
  return React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, React.createElement("path", {
    d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  }));
}