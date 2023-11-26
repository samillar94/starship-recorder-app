import { MarkerStack } from ".";

export default {
  title: "Components/MarkerStack",
  component: MarkerStack,
  argTypes: {
    property1: {
      options: ["labelled", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "labelled",
    className: {},
    markerCircleText: "#0",
    markerCircleText1: "B?",
    markerCircleDivClassName: {},
    markerCircleText2: "#0",
    markerCircleDivClassNameOverride: {},
    markerCircleText3: "S?",
    markerCircleDivClassName1: {},
    text: "SHIP NAME on BOOSTER NAME",
    text1: "S?<br/>+ B?",
    divClassName: {},
    text2: "#0+#0",
  },
};
