import React from "react";
import "./Widget.css";

function Widget(props) {
  return <div className="Widget">{props.children}</div>;
}

export default Widget;
