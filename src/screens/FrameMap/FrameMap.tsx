import React from "react";
import { MarkerCircle } from "../../components/MarkerCircle";
import { MarkerStack } from "../../components/MarkerStack";
import { TimeButton } from "../../components/TimeButton";
import { ToolAddRecord } from "../../components/ToolAddRecord";
import { ToolSelectQuery } from "../../components/ToolSelectQuery";
import "./style.css";

export const FrameMap = (): JSX.Element => {
  return (
    <div className="frame-map">
      <div className="div-2">
        <div className="canvas">
          <div className="instructions">
            <div className="overlap-group-6">
              <p className="welcome-to-the">
                Welcome to the Ringwatchers Project M.O.I.S.T. demo in Figma!
                <br />
                This pathfinds and demonstrates some of the functionality we’re
                hoping to implement, e.g. click on a marker to toggle its full
                label. <br />
                To get maximum zoom, click&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                at the top right.
              </p>
              <img className="image" alt="Image" src="/img/image-1.png" />
            </div>
          </div>
          <MarkerCircle
            className="marker-m-circle-instance"
            divClassName="marker-circle-2"
            divClassNameOverride="marker-circle-3"
            overlapGroupClassName="--special-yellow"
            stateProp="normal"
            code="B14.1\nF:3"
            thingIds="#175"
            timeArc="/img/time-arc-7.svg"
          />
          <MarkerStack
            className="marker-stack"
            divClassName="marker-stack-instance"
            markerCircleDivClassName="design-component-instance-node-2"
            markerCircleDivClassName1="design-component-instance-node-2"
            markerCircleDivClassNameOverride="design-component-instance-node-3"
            markerCircleText="#24"
            markerCircleText1="B9"
            markerCircleText2="#20"
            markerCircleText3="S25"
            property1="default"
            text="Ship 25 on Booster 9"
            text1="S25\n+ B9"
            text2="#20+#24"
          />
          <MarkerCircle
            className="marker-circle-4"
            divClassName="design-component-instance-node-3"
            divClassNameOverride="design-component-instance-node-2"
            overlapGroupClassName="--special-yellow"
            stateProp="normal"
            code="B12"
            thingIds="#40"
            timeArc="/img/time-arc-7.svg"
          />
          <MarkerCircle
            className="marker-circle-6"
            divClassName="marker-circle-8"
            divClassNameOverride="design-component-instance-node-2"
            overlapGroupClassName="--special-yellow"
            stateProp="normal"
            code="S?\nML:4"
            thingIds="#88"
            timeArc="/img/time-arc-7.svg"
          />
          <MarkerCircle
            className="marker-circle-9"
            divClassName="marker-circle-10"
            divClassNameOverride="marker-circle-11"
            stateProp="normal"
            code=":D"
            thingIds="#12"
            timeArc="/img/time-arc-7.svg"
            overlapGroupClassName="--special-yellow"
          />
        </div>
        <div className="toolbar">
          <ToolSelectQuery
            className="tool-select-query-instance"
            property1="default"
            vectorClassName="tool-select-query-2"
          />
          <ToolAddRecord className="tool-add-record-instance" />
          <div className="tool-pan-zoom">
            <img className="vector-2" alt="Vector" src="/img/vector-2-1.svg" />
          </div>
        </div>
        <div className="timebar">
          <p className="text-wrapper-11">18:00, Monday 25th September 2023</p>
          <TimeButton
            className="time-button-2"
            property1="default"
            text="◁◁"
            polygon={""}
          />
          <TimeButton
            className="time-button-3"
            property1="default"
            text="1D▷"
            polygon={""}
          />
          <TimeButton
            className="time-button-4"
            property1="default"
            text="◁1W"
            polygon={""}
          />
          <TimeButton
            className="time-button-5"
            property1="default"
            text="1W▷"
            polygon={""}
          />
          <TimeButton
            className="time-button-6"
            property1="default"
            text="◁1D"
            polygon={""}
          />
          <TimeButton
            className="time-button-7"
            property1="default"
            text="▷▷"
            polygon={""}
          />
        </div>
        <div className="text-wrapper-12">Editor’s view</div>
      </div>
    </div>
  );
};
