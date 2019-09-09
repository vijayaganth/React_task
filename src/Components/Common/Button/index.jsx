import React from "react";
import "./Button.scss";

export default ({text, click}) => <button className="button button-primary" onClick={click}>{text}</button>