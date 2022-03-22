import React from 'react';

import TimerSteps from '../components/TimerSteps';

export default {
  title: 'Menu/TimerSteps',
  component: TimerSteps,
};

const Template = (args) => <TimerSteps {...args} />;

export const TimerStepsSample = Template.bind({});
TimerStepsSample.args = {
  onchangeCurrent: (current) => console.log("onchangeCurrent 실행", current),
  onClickDone: () => console.log("onClickDone 실행"),
};
