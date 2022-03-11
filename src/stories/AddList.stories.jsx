import React from 'react';

import AddList from '../components/AddList';

export default {
  title: 'Input/AddList',
  component: AddList,
};

const Template = (args) => <AddList {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  placeholder: "새로운 카테고리",
  value: "",
  onChange: (e) => console.log("onChange", e),
  onPressEnter: (e) => console.log("onPressEnter", e),
  onPressEscape: (e) => console.log("onPressEscape", e),
};
