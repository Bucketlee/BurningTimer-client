import React from 'react';

import TaskSetting from '../components/TaskSetting';

export default {
  title: 'Task/TaskSetting',
  component: TaskSetting,
};

const Template = (args) => <TaskSetting {...args} />;

export const TaskSettingSample = Template.bind({});
TaskSettingSample.args = {
  onSelectCategory: (el) => console.log("onSelectCategory 실행", el),
  onSelectLabel: (el) => console.log("onSelectLabel 실행", el),
  onTimeChange: (time) => console.log("onTimeChange 실행", time),
};
