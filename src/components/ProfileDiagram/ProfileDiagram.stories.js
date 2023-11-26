import { ProfileDiagram } from ".";

export default {
  title: "Components/ProfileDiagram",
  component: ProfileDiagram,
  argTypes: {
    part: {
      options: ["none", "ship", "d-edome", "two", "three", "booster", "one", "four", "ship-ML-4"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    part: "none",
    className: {},
  },
};
