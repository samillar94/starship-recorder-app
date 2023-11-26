/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { AddThingInfo } from "../AddThingInfo";
import "./style.css";
import "/styleguide.css";

interface Props {
  className: any;
}

export const ToolAddRecord = ({ className }: Props): JSX.Element => {
  return (
    <div className={`tool-add-record ${className}`}>
      <AddThingInfo
        addEventAddEventClassName="add-thing-info-2"
        addEventSubtract="/img/subtract-8.svg"
        addEventSubtractClassName="design-component-instance-node"
        className="add-thing-info-instance"
      />
    </div>
  );
};
