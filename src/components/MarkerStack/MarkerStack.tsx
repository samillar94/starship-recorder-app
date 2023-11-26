/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { PinButton } from "../../icons/PinButton";
import { MarkerCircle } from "../MarkerCircle";
import "./style.css";
import "/styleguide.css";

interface Props {
  property1: "labelled" | "default";
  className: any;
  markerCircleText: string;
  markerCircleText1: string;
  markerCircleDivClassName: any;
  markerCircleText2: string;
  markerCircleDivClassNameOverride: any;
  markerCircleText3: string;
  markerCircleDivClassName1: any;
  text: string;
  text1: string;
  divClassName: any;
  text2: string;
}

export const MarkerStack = ({
  property1,
  className,
  markerCircleText = "#0",
  markerCircleText1 = "B?",
  markerCircleDivClassName,
  markerCircleText2 = "#0",
  markerCircleDivClassNameOverride,
  markerCircleText3 = "S?",
  markerCircleDivClassName1,
  text = "SHIP NAME on BOOSTER NAME",
  text1 = "S?\n+ B?",
  divClassName,
  text2 = "#0+#0",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div className={`marker-stack property-1-${state.property1} ${className}`}>
      <div className="overlap-5">
        {state.property1 === "default" && (
          <>
            <MarkerCircle
              className="marker-circle"
              divClassName="marker-m-circle"
              divClassNameOverride={markerCircleDivClassName}
              overlapGroupClassName="marker-booster"
              stateProp="normal"
              code={markerCircleText1}
              thingIds={markerCircleText}
              timeArc="/img/time-arc-7.svg"
            />
            <MarkerCircle
              className="marker-circle"
              divClassName={markerCircleDivClassNameOverride}
              divClassNameOverride={markerCircleDivClassName1}
              overlapGroupClassName="marker-ship"
              stateProp="normal"
              code={markerCircleText3}
              thingIds={markerCircleText2}
              timeArc="/img/time-arc-7.svg"
            />
            <div className="frame">
              <div className="full-stack-with">
                <br />
                <br />
                Full stack with interstage
              </div>
              <p className="SHIP-NAME-on-BOOSTER">{text}</p>
            </div>
          </>
        )}

        <div className="overlap-6">
          {state.property1 === "labelled" && (
            <>
              <div className="frame-wrapper">
                <div className="frame-2">
                  <div className="full-stack-with-2">
                    <br />
                    <br />
                    Full stack with interstage
                  </div>
                  <p className="SHIP-NAME-on-BOOSTER-2">{text}</p>
                </div>
              </div>
              <div className="overlap-wrapper">
                <div className="overlap-7">
                  <img
                    className="img"
                    alt="Time arc"
                    src="/img/time-arc-7.svg"
                  />
                  <div className="s-b">{text1}</div>
                  <div className="element-2">{text2}</div>
                </div>
              </div>
            </>
          )}

          {state.property1 === "default" && (
            <div className="overlap-7">
              <img className="img" alt="Time arc" src="/img/time-arc-7.svg" />
              <div className="s-b">{text1}</div>
              <div className={`element-2 ${divClassName}`}>{text2}</div>
            </div>
          )}
        </div>
        {state.property1 === "labelled" && (
          <>
            <div className="overlap-8">
              <PinButton className="pin-button-instance" />
              <div
                className="union-wrapper"
                onClick={() => {
                  dispatch("click");
                }}
              >
                <img className="union-2" alt="Union" src="/img/union.svg" />
              </div>
            </div>
            <MarkerCircle
              className="marker-9m-circle-90px"
              divClassName="marker-m-circle"
              overlapGroupClassName="marker-booster"
              stateProp="normal"
              code="B?"
              thingIds="#0"
              timeArc="/img/time-arc-7.svg"
              divClassNameOverride={undefined}
            />
            <MarkerCircle
              className="marker-circle-instance"
              divClassName="marker-m-circle"
              overlapGroupClassName="marker-ship"
              stateProp="normal"
              code="S?"
              thingIds="#0"
              timeArc="/img/time-arc-7.svg"
              divClassNameOverride={undefined}
            />
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
        property1: "default",
      };
  }

  return state;
}

MarkerStack.propTypes = {
  property1: PropTypes.oneOf(["labelled", "default"]),
  markerCircleText: PropTypes.string,
  markerCircleText1: PropTypes.string,
  markerCircleText2: PropTypes.string,
  markerCircleText3: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};
