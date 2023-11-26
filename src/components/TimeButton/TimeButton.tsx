/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";
import "/styleguide.css";

interface Props {
  property1: "hover" | "default";
  className: any;
  text: string;
  polygon: string;
}

export const TimeButton = ({
  property1,
  className,
  text = "▷◁",
  polygon = "/img/polygon-1.svg",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`time-button ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className={`overlap-9 ${state.property1}`}>
        {state.property1 === "default" && (
          <>
            <div className="text-wrapper-10">{text}</div>
            <div className="tardis">
              <div className="overlap-group-3">
                <div className="rectangle-3" />
                <img className="polygon" alt="Polygon" src={polygon} />
              </div>
            </div>
          </>
        )}

        {state.property1 === "hover" && (
          <div className="overlap-group-4">
            <div className="rectangle-4" />
            <div className="rectangle-5" />
            <div className="rectangle-6" />
            <img
              className="polygon-2"
              alt="Polygon"
              src="/img/polygon-1-9.svg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

TimeButton.propTypes = {
  property1: PropTypes.oneOf(["hover", "default"]),
  text: PropTypes.string,
  polygon: PropTypes.string,
};
