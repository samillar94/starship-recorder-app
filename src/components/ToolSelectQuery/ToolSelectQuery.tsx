/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import "/styleguide.css";

interface Props {
  property1: "default";
  className: any;
  vectorClassName: any;
}

export const ToolSelectQuery = ({
  property1,
  className,
  vectorClassName,
}: Props): JSX.Element => {
  return (
    <div className={`tool-select-query ${className}`}>
      <img
        className={`vector ${vectorClassName}`}
        alt="Vector"
        src="/img/vector-1-1.svg"
      />
    </div>
  );
};

ToolSelectQuery.propTypes = {
  property1: PropTypes.oneOf(["default"]),
};
