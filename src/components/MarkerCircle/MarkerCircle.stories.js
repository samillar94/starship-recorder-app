import { MarkerCircle } from ".";

export default {
  title: "Components/MarkerCircle",
  component: MarkerCircle,
  argTypes: {
    stateProp: {
      options: ["labelled", "normal"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "labelled",
    className: {},
    overlapGroupClassName: {},
    timeArc: "/img/time-arc-14.svg",
    divClassName: {},
    text: ":_",
    divClassNameOverride: {},
    text1: "#0",
  },
};
