import React from 'react';

import Labels from '../components/Labels';

export default {
  title: 'Label/Display',
  component: Labels,
};

const Template = (args) => <Labels {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  category: "BurningTimer 업데이트",
  labels: ["API / Schema 정리", "서버 구축", "클라이언트 구축"],
  createNewLabel: () => console.log("createNewLabel 실행"),
  onClickLabel:  (e) => console.log("onClickLabel 실행", e),
};
