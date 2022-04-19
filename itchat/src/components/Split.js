import React from "react";
import Split from '../styles/Split.css'
export default function SplitPane(props) {
    return (
      <div className="SplitPane ">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-middle">
          {props.middle}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }
  
  