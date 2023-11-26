/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { PinButton1 } from "../../icons/PinButton1";
import { ProfileDiagram } from "../ProfileDiagram";
import { TimeButton } from "../TimeButton";
import "./style.css";
import "/styleguide.css";

interface Props {
  stateProp: "labelled" | "normal";
  className: any;
  overlapGroupClassName: any;
  timeArc?: string;
  divClassName: any;
  code: string;
  divClassNameOverride: any;
  thingIds: string;
}

export const MarkerCircle = ({
  stateProp,
  className,
  overlapGroupClassName,
  timeArc = "/img/time-arc-14.svg",
  divClassName,
  code = ":_",
  divClassNameOverride,
  thingIds = "#0",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "normal",
  });

  // const colorMap = {
  //   S: "--ship-blue",
  //   B: "--superheavy-red",
  //   SB: "--stack-pink",
  //   G: "--service-green",
  //   X: "--special-yellow",
  // };

  return (
    <div
      className={`marker-circle ${state.state} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="marker-2">
        {state.state === "normal" && (
          <div className={`overlap-group ${overlapGroupClassName}`}>
            <img className="time-arc" alt="Time arc" src={timeArc} />
            <div className={`marker-main-label ${divClassName}`}>
              <p>{code}</p>
            </div>
            <div className={`element ${divClassNameOverride}`}>{thingIds}</div>
          </div>
        )}

        {state.state === "labelled" && (
          <>
            <div className="label">
              <div className="overlap">
                <img className="fuzz" alt="Fuzz" src="/img/fuzz.svg" />
                <div className="label-surround" />
                <div className="label-right">
                  <div className="div">
                    <p className="likely-assignment">
                      Likely assignment 1 (60%c)
                      <br />
                      Possibly assignment 2 (30%c)
                    </p>
                    <div className="text-wrapper-2">First record:</div>
                    <div className="build-feature">
                      Build &amp; feature details:
                    </div>
                    <div className="text-wrapper-3">Latest record:</div>
                    <p className="p">build/state 1 • build/state 2</p>
                    <div className="text-wrapper-4">2023-01-01</div>
                    <div className="text-wrapper-5">2023-09-09</div>
                    <div className="text-wrapper-6">Record details</div>
                    <div className="view-records-button">
                      <div className="overlap-group-2">
                        <div className="rectangle" />
                        <div className="text-wrapper-7">View records</div>
                      </div>
                    </div>
                    <div className="edit-records-button">
                      <div className="overlap-2">
                        <div className="rectangle-2" />
                        <div className="text-wrapper-8">Edit records</div>
                      </div>
                    </div>
                    <TimeButton
                      className="time-button-instance"
                      polygon="/img/polygon-1-7.svg"
                      property1="default"
                      text="▷◁"
                    />
                    <TimeButton
                      className="instance-node"
                      polygon="/img/polygon-1-7.svg"
                      property1="default"
                      text="▷◁"
                    />
                  </div>
                  <div className="overlap-3">
                    <PinButton1 className="pin-button" />
                    <div
                      className="close-button"
                      onClick={() => {
                        dispatch("click_203");
                      }}
                    >
                      <img
                        className="union"
                        alt="Union"
                        src="/img/union-1.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="label-left">
                  <div className="overlap-4">
                    <div className="article-full-name">ARTICLE FULL NAME</div>
                    <div className="PART-FULL-NAME">PART FULL NAME</div>
                    <div className="AND-OR-THING">
                      AND/OR THING LABELLED / DUBBED NAME
                    </div>
                  </div>
                </div>
                <ProfileDiagram
                  className="profile-diagram-instance"
                  part="none"
                />
              </div>
            </div>
            <div
              className="marker"
              onClick={() => {
                dispatch("click_218");
              }}
            >
              <div className="overlap-group">
                <img
                  className="time-arc"
                  alt="Time arc"
                  src="/img/time-arc-7.svg"
                />
                <div className={`marker-main-label ${divClassName}`}>
                  <p>{code}</p>
                </div>
                <div className="element">{thingIds}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "click":
      return {
        ...state,
        state: "labelled",
      };

    case "click_203":
      return {
        ...state,
        state: "normal",
      };

    case "click_218":
      return {
        ...state,
        state: "normal",
      };
  }

  return state;
}

MarkerCircle.propTypes = {
  stateProp: PropTypes.oneOf(["labelled", "normal"]),
  timeArc: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
};
