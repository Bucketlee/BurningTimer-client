import React from "react"

import DateSelector from "../components/DateSelector";

export default {
  title: "Date/DateSelector",
  component: DateSelector,
};

const Template = (args) => <DateSelector {...args} />;

export const DateSelectorSample = Template.bind({});
DateSelectorSample.args = {
  onSelectDate: (e) => console.log("onSelectDate 선택", e),
};
