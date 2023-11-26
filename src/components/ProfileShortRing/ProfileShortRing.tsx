/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import "/styleguide.css";

interface Props {
  className: any;
  rectangleClassName: any;
}

export const ProfileShortRing = ({
  className,
  rectangleClassName,
}: Props): JSX.Element => {
  return (
    <div className={`profile-short-ring ${className}`}>
      <div className={`rectangle-7 ${rectangleClassName}`} />
    </div>
  );
};
