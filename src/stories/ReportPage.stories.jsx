import React from 'react';

import ReportPageView from '../components/ReportPage/ReportPageView';

export default {
  title: 'Page/ReportPage',
  component: ReportPageView,
};

const Template = (args) => <ReportPageView {...args} />;

export const ReportPageSample = Template.bind({});
ReportPageSample.args = {
  onSelectDate: (date) => console.log("onSelectDate 실행", date),
  labels: [
    {
      title: "하루 평균 집중한 시간",
      value: "03:05:42",
      imageName: "run-time",
    },
    {
      title: "하루 평균 집중한 횟수",
      value: "5회",
      imageName: "average-count",
    },
    {
      title: "집중 당 평균 시간",
      value: "00:40:02",
      imageName: "average-time",
    },
    {
      title: "기간 내 진행 일 수",
      value: "5일 / 7일",
      imageName: "run-days",
    },
  ],
  data: [],
  selectedDate: [],
};
