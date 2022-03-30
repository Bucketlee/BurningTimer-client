import React from "react";

import DataLabel from "../components/DataLabel";

export default {
  title: "Label/DataLabel",
  component: DataLabel,
};

const Template = (args) => <DataLabel {...args} />;

export const AverageBurningTimePerDay = Template.bind({});
AverageBurningTimePerDay.args = {
  title: "하루 평균 버닝 시간",
  value: "02:42:14",
  imageName: "run-time",
};

export const AverageRunCountPerDay = Template.bind({});
AverageRunCountPerDay.args = {
  title: "하루 평균 버닝 횟수",
  value: "2회",
  imageName: "average-count",
};

export const RunDaysWithinDatePeriod = Template.bind({});
RunDaysWithinDatePeriod.args = {
  title: "기간 내 진행 일 수",
  value: "5일 / 7일",
  imageName: "run-days",
};


export const AverageBurningTimePerRun = Template.bind({});
AverageBurningTimePerRun.args = {
  title: "평균 집중 시간",
  value: "01:21:07",
  imageName: "average-time",
};
