import React from 'react';

import CountTimer from '../components/CountTimer';

export default {
  title: 'Timer/CountTimer',
  component: CountTimer,
};

const Template = (args) => <CountTimer {...args} />;

export const Timer = Template.bind({});
Timer.args = {
  ms: 5000,
  onTimerStart: () => {
    console.log("onTimerStart 실행");
  },
  onTimerPause: () => {
    console.log("onTimerPause 실행");
  },
  onTimerStop: () => {
    console.log("onTimerStop 실행");
  },
};
