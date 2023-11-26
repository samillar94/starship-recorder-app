/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { AddEvent } from "../AddEvent";
import "./style.css";
import "/styleguide.css";

interface Props {
  className: any;
  addEventSubtractClassName: any;
  addEventSubtract: string;
  addEventAddEventClassName: any;
}

export const AddThingInfo = ({
  className,
  addEventSubtractClassName,
  addEventSubtract = "/img/subtract-6.svg",
  addEventAddEventClassName,
}: Props): JSX.Element => {
  return (
    <div className={`add-thing-info ${className}`}>
      <AddEvent
        className={addEventAddEventClassName}
        subtract={addEventSubtract}
        subtractClassName={addEventSubtractClassName}
      />
    </div>
  );
};

AddThingInfo.propTypes = {
  addEventSubtract: PropTypes.string,
};
