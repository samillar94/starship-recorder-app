import { ToolSelectQuery } from ".";

export default {
  title: "Components/ToolSelectQuery",
  component: ToolSelectQuery,
  argTypes: {
    property1: {
      options: ["default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "default",
    className: {},
    vectorClassName: {},
  },
};
