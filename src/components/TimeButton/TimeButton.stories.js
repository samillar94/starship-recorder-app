import { TimeButton } from ".";

export default {
  title: "Components/TimeButton",
  component: TimeButton,
  argTypes: {
    property1: {
      options: ["hover", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "hover",
    className: {},
    text: "▷◁",
    polygon: "/img/polygon-1.svg",
  },
};
