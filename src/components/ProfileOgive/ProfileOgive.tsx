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
  subtract: string;
}

export const ProfileOgive = ({
  className,
  subtract = "/img/subtract-1.svg",
}: Props): JSX.Element => {
  return (
    <div className={`profile-ogive ${className}`}>
      <img className="subtract-2" alt="Subtract" src={subtract} />
    </div>
  );
};

ProfileOgive.propTypes = {
  subtract: PropTypes.string,
};
