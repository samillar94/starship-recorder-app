/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import "/styleguide.css";

interface Props {
  className: any;
  subtractClassName: any;
  subtract: string;
}

export const AddEvent = ({
  className,
  subtractClassName,
  subtract = "/img/subtract-6.svg",
}: Props): JSX.Element => {
  return (
    <div className={`add-event ${className}`}>
      <img
        className={`subtract ${subtractClassName}`}
        alt="Subtract"
        src={subtract}
      />
    </div>
  );
};

AddEvent.propTypes = {
  subtract: PropTypes.string,
};
